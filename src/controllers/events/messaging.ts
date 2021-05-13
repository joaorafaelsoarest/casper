import actions from '@actions';
import { DialogflowQueryParams, FacebookSendingOptions, Framework, WebhookEventFields } from '@bot.elife/framework';
import { find, getProfile, updateSession } from '@controllers/users';
import { BotOptions, Event, EventOptions, User } from '@interfaces';
import logger from '@logger/winston';
import defaultTo from 'helpers/defaultTo';
import { slack } from 'helpers/logs';

const MESSAGE_DELAY_IN_SECONDS = 1;
const DEFAULT_TEXT_ACTION_NAME = 'text';
const DEFAULT_BOT_LANGUAGE = 'pt-br';

const bot: Event = async (options: EventOptions) => {
  const botOptions = await getBotOptions(options);

  try {
    logs(botOptions);

    const { messages, outputContexts, canSendMessages } = await runBotAction(botOptions);

    botOptions.dialogflow.messages = messages;
    botOptions.dialogflow.queryResult.outputContexts = outputContexts;

    if (canSendMessages) {
      sendMessages(botOptions);
    }

    updateSession(botOptions);

  } catch (error) {
    logger.error(error.message, error);
    slack(botOptions.framework, error, '/controllers/events/messaging');
  }
};

function logs(botOptions: BotOptions) {
  logger.info('/controllers/events/messaging');
  logger.info(botOptions.dialogflow);
  logger.info(botOptions.user);
  logger.info(botOptions.event);
}

async function runBotAction(botOptions: BotOptions) {
  const { user, dialogflow } = botOptions;
  const actionName = defaultTo(dialogflow.queryResult.action, DEFAULT_TEXT_ACTION_NAME);
  const { messages, isBotReactivationAction, outputContexts } = await (await actions(actionName))(botOptions);

  return {
    messages,
    outputContexts: defaultTo(outputContexts, dialogflow.queryResult.outputContexts),
    canSendMessages: defaultTo(isBotReactivationAction, user.botEnabled),
  };
}

function sendMessages({ event, framework, dialogflow }: BotOptions) {
  const { psid, pageId } = event.property;

  const options: FacebookSendingOptions = {
    pageId,
    delay: MESSAGE_DELAY_IN_SECONDS,
    linkTracking: true,
  };

  const messagesToString = JSON.stringify(dialogflow.messages);
  // Passar o segundo parametro para 'false' para desabilitar o censurador
  dialogflow.messages = JSON.parse(framework.util.text.censorBadWords(messagesToString, true));

  framework.analytics.saveMessages(event, dialogflow);

  return framework.facebook.sendMessages(psid, dialogflow.messages, options);
}

async function getBotOptions({ event, framework }: {
  event: WebhookEventFields,
  framework: Framework,
}): Promise<BotOptions> {

  const profile = await getProfile(event, framework);
  const user = await find(event.property.psid, framework);
  const request = configDialogflowRequestQuery({ event, user });
  const dialogflow = await framework.dialogflow.query(request, profile);

  user.facebook = profile;

  return {
    user,
    event,
    framework,
    dialogflow,
  };
}

function configDialogflowRequestQuery({ event, user }: {
  event: WebhookEventFields,
  user: User,
}) {
  const { content, psid } = event.property;
  const { botEnabled, session, uuid } = user as User;

  const query: DialogflowQueryParams = {
    contexts: session.contexts,
    query: content,
    session: psid,
    language: DEFAULT_BOT_LANGUAGE,
    resetContexts: !botEnabled,
    customPatterns: [['{uuid}', uuid], ['%7Buuid%7D', uuid]],
    textCleaner: {
      stopwordsType: 'none',
      language: 'pt',
      allowedSymbols: [],
      allowedWords: [],
      customStopwords: [],
    },
    queryLength: {
      clean: 250,
      original: 250,
    },
  };

  return query;
}

export default bot;

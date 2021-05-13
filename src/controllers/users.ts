import { ApiMeField, Framework, WebhookEventFields } from '@bot.elife/framework';
import { BotOptions, User } from '@interfaces';
import logger from '@logger/winston';
import { v4 } from 'uuid';

const COLLECTION = 'users';
const PROFILE_FIELDS: ApiMeField[] = ['first_name', 'last_name', 'name', 'locale', 'gender'];

async function find(psid: number, framework: Framework): Promise<User> {
  let user = await framework.mongodb.findOne(COLLECTION, { psid });

  if (!user) {
    user = insert(psid, framework);
  }

  return user;
}

function insert(psid: number, framework: Framework): User {
  const date = framework.util.time.isoDateNow('');

  const user: User = {
    psid,
    createdAt: date,
    facebook: {},
    uuid: v4(),
    botEnabled: true,
    botLanguage: 'pt-br',
    notifications: {
      enabled: false,
      timestamp: '',
    },
    session: {
      lastAccess: date,
      contexts: [],
      lastAction: '',
      actionIncomplete: false,
    },
    inbox: null,
    isElife: false,
  };

  framework.mongodb.insertOne(COLLECTION, user).catch((error) => {
    logger.error(error.message, error);
  });

  return user;
}

function updateOne(psid: number, framework: Framework, body: object): any {
  return framework.mongodb.updateOne(COLLECTION, { psid }, { $set: body });
}

async function updateSession(botOptions: BotOptions) {
  const { framework, dialogflow, user } = botOptions;
  const outputContexts = dialogflow.queryResult.outputContexts;
  const sessionContexts = framework.dialogflow.encodeContexts(outputContexts);

  const query = {
    'session.lastAccess': framework.util.time.isoDateNow(),
    'session.lastAction': dialogflow.queryResult.action,
    'session.contexts': sessionContexts,
    facebook: user.facebook,
  };

  return updateOne(user.psid, framework, query);
}

function getProfile(event: WebhookEventFields, framework: Framework) {
  const { psid, pageId } = event.property;
  const fields = PROFILE_FIELDS;

  return framework.facebook.me(psid, { pageId, fields });
}

export { insert, find, updateOne, updateSession, getProfile };

import { DialogflowQueryParams, Framework, WebhookEventFields } from '@bot.elife/framework';
import { Event } from '@interfaces';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Context } from 'dialogflow';

const ACCESS_TOKEN = JSON.parse(process.env.PAGE_ACCESS_TOKEN as string)[0].token;

/**
 * Feed para versão v6 da API do Facebook
 * A intent deve possuir obrigatoriamente o contexto de entrada "feed" e de saída "free".
 * Para segurança a intent também deve possuir a tag "[Feed]" no título da intent, assim
 * essa intent só é ativada realmente após um comentário na página
 *
 */
const feed: Event = async ({ framework, event }): Promise<void> => {
  const request = query(framework, event);
  const dialogflow = await framework.dialogflow.query(request);
  const { comment_id, from } = event.fullWebhookEvent.entry[0].changes[0].value;
  const intent = dialogflow.queryResult.intent.displayName;

  if (intent.includes('[Feed]')) {
    const message = replaceName(dialogflow.messages[0], from);

    privateReply(comment_id, message);
  }
};

function replaceName(message: any, from: any) {
  const firstName = from.name.split(' ')[0];

  message = JSON.stringify(message)
    .replace('{first_name}', firstName);

  return JSON.parse(message);
}

function query(framework: Framework, event: WebhookEventFields): DialogflowQueryParams {
  const { content, psid } = event.property;

  const query: DialogflowQueryParams = {
    contexts: [createFeedContext(framework, psid.toString())],
    query: content,
    session: psid.toString(),
    language: 'pt-br',
    resetContexts: true,
    textCleaner: {
      stopwordsType: 'lite',
      language: 'pt',
      allowedSymbols: [],
      allowedWords: [],
      customStopwords: [],
    },
  };

  return query;
}

async function privateReply(commentId: string, message: string) {
  // Comentário teste da bots@elife
  // commentId = '491695994927324_626854588078130';

  try {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `https://graph.facebook.com/v6.0/me/messages`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      params: {
        access_token: ACCESS_TOKEN,
      },
      data: {
        message,
        recipient: {
          comment_id: commentId,
        },
      },
    };
    const result = axios(request);

    console.log('Resposta feed: ', (await result).data);
  } catch (error) {
    console.log('Resposta feed: ', ((error as AxiosError).response as any).data);
  }
}

function createFeedContext(framework: Framework, sessionId: string) {
  const contextClient = framework.dialogflow.getContextsClient();

  const context: Context = {
    name: contextClient.contextPath(framework.dialogflow.getProjectId(), sessionId, 'feed'),
    lifespanCount: 1,
    parameters: {},
  };

  return context;
}

export default feed;

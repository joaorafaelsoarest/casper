import { Action, NotUnderstoodMessage } from '@interfaces';
import { now } from 'helpers/date';

const execute: Action = async ({ dialogflow, user, framework }) => {

  if (!user.isElife) {
    const doc: NotUnderstoodMessage = {
      name: (user.facebook.name || user.facebook.first_name) as string,
      userId: user.psid,
      timestamp: now(),
      message: dialogflow.textCleanerResult.original,
      query: dialogflow.queryResult.queryText,
    };

    framework.mongodb.insertOne('not_understood', doc);
  }

  return {
    messages: dialogflow.messages,
  };
};

export default execute;

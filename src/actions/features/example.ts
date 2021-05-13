/*

import { Action } from '@interfaces';

const execute: Action = async ({ framework, event, user, dialogflow }) => {

  return {
    messages: dialogflow.messages,
  };
};
// export default execute;
// export { execute };

const contact: Action = async ({ framework, event, user, dialogflow }) => {
  framework.analytics.saveContact(user.psid, { data: event.property.content });

  return {
    messages: dialogflow.messages,
  }
}

*/

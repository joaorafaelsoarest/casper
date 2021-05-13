import { Action } from '@interfaces';

const execute: Action = async ({ dialogflow }) => {

  return {
    messages: dialogflow.messages,
  };
};

export default execute;

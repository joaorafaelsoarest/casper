import { Action } from '@interfaces';

const execute: Action = async ({ dialogflow }) => {
  
  
  return {
    messages: dialogflow.messages[0],
  };
};

export default execute;
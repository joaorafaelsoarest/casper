import { Action } from '@interfaces';

const execute: Action = async ({ dialogflow, framework }) => {

    
  const notices = framework.mongodb.find("notice", {"theme": "esportes"});

  dialogflow.messages[0].attachment.payload.elements = await
      notices.map((notice) => {
        return {
          title: `${notice.title}`,
          subtitle: `${notice.description}`,
          image_url: `${notice.linkImage}`,
          buttons: [
            {
              type: 'web_url',
              title: 'Ver notícia',
              url: `${notice.linkImage}`,
            },
          ],
        };
      });

  return {
    messages: dialogflow.messages[0],
  };
};

export default execute;
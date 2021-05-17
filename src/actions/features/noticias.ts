import { Action } from '@interfaces';

const execute: Action = async ({ framework, dialogflow }) => {

    const noticias: any = await framework.mongodb.find("notice", {"theme": "esportes"});

    dialogflow.messages[0].facebook.attachment.payload.elements = 
    noticias.map((noticia) => {
      return {
        title: `${noticia.title}`,
        subtitle: `${noticia.description}`,
        image_url: `${noticia.linkImage}`,
        buttons: [
          {
            type: 'web_url',
            title: 'Ver notícia',
            url: `${noticia.linkImage}`
          }
        ],
      };
    });

    return {
    messages: [dialogflow.messages[0]],
  }
};

export default execute;

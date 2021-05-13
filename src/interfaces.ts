import { DialogFlowResponse, FacebookProfile, Framework, UserInboxInfos, WebhookEventFields } from '@bot.elife/framework';
import { Context } from 'dialogflow';

export interface User {
  psid: number;
  uuid: string;
  createdAt: string;
  botEnabled: boolean;
  botLanguage: Language;
  facebook: FacebookProfile;
  inbox?: UserInboxInfos | null;
  notifications?: {
    enabled: boolean;
    timestamp: string;
  };
  session: {
    lastAccess: string | null;
    contexts: Context[];
    lastAction: string;
    actionIncomplete: boolean;
  };

  /*  privacyPolicy: {
     accepted: boolean,
     timestamp: string,
   }; */

  isElife: boolean;
}

/**
 * Idioma no bot. Deve estar disponível no Dialogflow, de preferência que possua
 * modo de treinamento ativo
 */
export type Language = 'pt-br' | 'pt-pt' | 'pt' | 'en' | 'fr' | 'es';

/**
 *  Configurações da função referente a uma action.
 *  Todas as actions recebem os mesmo parâmetros e
 *  devem retornar o mesmo objeto com o resultado.
 */
export type Action = (options: BotOptions) => Promise<ActionResult>;
export type Event = (options: EventOptions) => Promise<any>;

/**
 * Resultado de uma action
 */
export interface ActionResult {
  /** Mensagens que devem ser enviadas para o usuário */
  messages: any[];
  isBotReactivationAction?: boolean;
  outputContexts?: Context[];
}

export interface CardElement {
  title: string;
  subtitle: string;
  image_url: string;
  buttons: any[];
}

export interface NotUnderstoodMessage {
  message: string;
  userId: number;
  name?: string;
  timestamp: string;
  query: string;
}

export interface BotOptions {
  user: User;
  framework: Framework;
  dialogflow: DialogFlowResponse;
  event: WebhookEventFields;
}

export interface EventOptions {
  framework: Framework;
  event: WebhookEventFields;
}

export interface BotParameters {
  framework: Framework;
  user?: User;
  dialogflow?: DialogFlowResponse;
  event?: WebhookEventFields;
}

export interface ClickPayload {
  url: string;
}
export interface ClickData extends ClickPayload {
  id: string;
  userUuid: string;
  createdAt: string;
  savedAt: string | null;
}

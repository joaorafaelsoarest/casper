import { WebhookEventFields } from '@bot.elife/framework';
import { Event, EventOptions } from '@interfaces';

const RESUME: string[] = [];

const echoes: Event = async ({ event, framework }: EventOptions): Promise<void> => {
  const isAttendance = isAttendanceMessage(event);

  if (isAttendance) {
    const query = {
      botEnabled: isActivationMessage(event, RESUME),
    };

    await framework.mongodb.updateOne('users', { psid: event.property.psid }, { $set: query });
  }
};

function isAttendanceMessage(event: WebhookEventFields) {
  return !event.fullWebhookEvent.entry[0].messaging[0].message.metadata && event.property.type === 'text';
}

function isActivationMessage(event: WebhookEventFields, messages: string[]) {
  const currentMessage = event.property.content;
  const isText = event.property.type === 'text';

  return isText && messages.some(str => currentMessage.includes(str));
}

export default echoes;

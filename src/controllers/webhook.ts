import { Framework } from '@bot.elife/framework';
import { Event } from '@interfaces';
import logger from '@logger/winston';
import { slack } from 'helpers/logs';

export default async function (webhookEvent: any, framework: Framework) {
  try {
    const event = framework.facebook.processWebhookEvent(webhookEvent);
    const module = await import(`./events/${event.eventType}`);

    (module.default as Event)({ framework, event });

  } catch (error) {
    logger.error(error.message, error);
    slack(framework, error, '/controllers/events/webhook');
  }
}

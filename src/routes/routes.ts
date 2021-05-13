import { Framework } from '@bot.elife/framework';
import logger from '@logger/winston';
import * as facebook from '@routes/facebook';
import * as github from '@routes/github';
import * as log from '@routes/logger';
import * as notices from './notices';

export default function (framework: Framework) {
  const app = framework.express.getApp();

  app.set('view engine', 'pug');
  app.set('views', './views');

  app.get('/facebook/webhook', facebook.get);
  app.post('/facebook/webhook', facebook.post(framework));
  app.post('/github/push/webhook', github.pullAndReloadVmPm2App);
  app.get('/logs/:page?', log.showLogs(logger));

  const mongo = framework.mongodb;

  const COLLECTION = 'notice';

  app.post('/notices', notices.create(COLLECTION, mongo));
  app.get('/notices/:_id', notices.index(COLLECTION, mongo));
  app.put('/notices', notices.update(COLLECTION, mongo));
  app.delete('/notices/:_id', notices.delete_n(COLLECTION, mongo))
}

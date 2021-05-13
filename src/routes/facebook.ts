import { Framework } from '@bot.elife/framework';
import webhook from '../controllers/webhook';

function get(req: any, res: any) {
  const VERIFY_TOKEN = process.env.VALIDATION_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) res.status(200).send(challenge);
    else res.sendStatus(403);
  }
}

function post(framework: Framework) {
  return (req: any, res: any) => {
    webhook(req.body, framework);

    res.sendStatus(200);
  };
}

export { get, post };

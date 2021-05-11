import { Framework } from '@bot.elife/framework';
import * as notices from '@controllers/notices';

export default function (framework: Framework) {
    const app = framework.express.getApp();
    const mongo = framework.mongodb;

    const COLLECTION = 'notice';

    app.post('/notices', notices.create(COLLECTION, mongo));
    app.get('/notices', notices.index(COLLECTION, mongo));
    app.put('/notices', notices.update(COLLECTION, mongo));
    app.delete('/notices/:_id', notices.delete_n(COLLECTION, mongo));

}
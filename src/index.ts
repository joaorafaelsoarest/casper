import fw, { FrameworkEnv, Log, PageAccessTokenStruct } from '@bot.elife/framework';
import 'dotenv/config';
import logger from '@logger/winston';
import routes from './routes';


start();
async function start(){
    try {
        const configs: FrameworkEnv = {
            mongodb: {
                uri: (process.env.MONGODB_URI as string),
                dbname: (process.env.DATABASE as string),
            },
      
            facebook: {
                pageAccessToken: JSON.parse(process.env.PAGE_ACCESS_TOKEN as string) as PageAccessTokenStruct[],
                validationToken: (process.env.VALIDATION_TOKEN as string),
                appSecretKey: (process.env.APP_SECRET_KEY as string),
            },
      
            dialogflow: {
                privateKey: (process.env.PRIVATE_KEY as string),
                clientEmail: (process.env.CLIENT_EMAIL as string),
                projectId: (process.env.PROJECT_ID as string),
            },
      
            express: {
                xHubSignatureValidationPaths: ['/facebook/webhook'],
                port: (process.env.PORT as string),
                authentications: [
                    {
                        path: '/blab',
                        includes: true,
                        token: '4rf8pxEkZQ6FMffCgZY2mKR67txOTEmm',
                    },
                    {
                        path: '/github/push/webhook',
                        token: 'rB1E1GvRSB',
                    },
                    {
                        path: '/logs',
                        token: 'HpMoFTLPvp',
                        includes: true,
                    },
                ],
            },
        };
      
        const framework = await fw(configs);
        routes(framework);

        logger.info(`Aplicação iniciada. Env: ${process.env.NODE_ENV}`, { path: './src/index' });
      
    } catch (error) {
        const log = new Log();
        logger.error(error.message, error);

        if (process.env.NODE_ENV === 'production') {
            log.slack({
                error,
                botName: process.env.BOT_NAME as string,
                handlerPath: '/src/index',
            });
        }
    }
}
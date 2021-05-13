import { Framework } from '@bot.elife/framework';

export function slack(framework: Framework, error: any, path: string) {
  if (process.env.NODE_ENV === 'production') {
    framework.log.slack({
      error,
      botName: process.env.BOT_NAME as string,
      handlerPath: path,
      level: 'error',
    });
  }
}

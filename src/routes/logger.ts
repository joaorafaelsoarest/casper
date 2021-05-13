/**
 * Projeto original:
 * https://github.com/ash-developer/winston-logs-display
 */

import { get, keys } from 'lodash';
import { Logger } from 'winston';

const LOGS_LINES_PER_PAGE = 100;

function showLogs(logger: Logger) {
  const winstonTransport = getWinstonTransport(logger);

  return (req: any, res: any) => {
    let page = Number(req.params.page) || 1;
    const accessToken = req.query.access_token || '';

    if (page < 1) {
      page = 1;
    }

    const queryOptions = {
      limit: LOGS_LINES_PER_PAGE,
      offset: (page - 1) * LOGS_LINES_PER_PAGE,
    };

    winstonReadLogsLines(winstonTransport, queryOptions).then((logs: any) => {
      const options  = {
        logs,
        accessToken,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page + 1,
      };

      res.render('logs', options);
    });
  };
}

async function winstonReadLogsLines(transport: any, options: any) {
  options.limit = get(options, 'limit', 100);
  options.offset = get(options, 'offset', 0);

  return new Promise((resolve, reject) => {
    transport.query({
      start: options.offset,
      limit: options.limit,

    }, (error: any, logs: any) => {
      if (error) {
        reject(error);
      }

      resolve(logs);
    });
  });
}

function getWinstonTransport(logger: Logger) {
  return logger.transports[keys(logger.transports)[0]];
}

export { showLogs };

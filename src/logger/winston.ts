import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createLogger, format, transports } from 'winston';

const LOGS_DIR = 'logs';

if (!existsSync(LOGS_DIR)) {
  mkdirSync(LOGS_DIR);
}

const logFileOptions: { [key: string]: transports.FileTransportOptions } = {
  error: {
    filename: join(LOGS_DIR, '/logs.log'),
    handleExceptions: true,
    maxsize: 10000000,
    maxFiles: 5,
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
  },
};

const consoleLogOptions: transports.ConsoleTransportOptions = {
  eol: '\n\n',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
  ),
};

const logger = createLogger({
  transports: [
    new transports.File(logFileOptions.error),
    new transports.Console(consoleLogOptions),
  ],
  exitOnError: false,
});

export default logger;
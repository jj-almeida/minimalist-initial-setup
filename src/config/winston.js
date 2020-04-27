import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
  level: process.env.NODE_ENV == 'production' ? 'info' : 'debug',

  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),

  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      ),
    }),

    new transports.File({
      filename: path.join('log', 'log.log'),
      //   format: format.combine(
      //     format.printf(
      //       (info) =>
      //         `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
      //     )
      //   ),
    }),
  ],
});

export default logger;

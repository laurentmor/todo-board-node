import winston from 'winston';
/* eslint-disable  import/no-unresolved */
import { NODE_ENV } from '@env';
/* eslint-enable  import/no-unresolved */
// import  Mail from 'winston-mail' ;
// import winstonExRegLogger from "winston-express-request-logger";

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '-> [LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:MM:SS',
  }),
  winston.format.printf(
    (info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
  ),
);
const format = winston.format.combine(
  winston.format.label({
    // label:'-> [LOGGER]'
  }),
  winston.format.timestamp({
    format: 'HH:mm:ss',
  }),
  winston.format.printf(
    (info) => `[${info.timestamp}]${info.level.charAt(0)}: ${info.message}`,
  ),
);
/* eslint-disable  import/no-mutable-exports */
let logger;
/* eslint-disable  import/no-mutable-exports */
if (NODE_ENV === 'production') {
  logger = winston.createLogger({
    transports: [

      new winston.transports.File(
        {
          filename: 'app.log',
          format,

        },
      ),

    ],

  });
} else {
  logger = winston.createLogger({
    transports: [

      new (winston.transports.Console)({
        format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),

      }),

    ],

  });
}

/* winstonExRegLogger.createLogger({
    transports: [

        new (winston.transports.Console)({
            handleExceptions: true,
            timestamp: true,
            level:"info"
        })
    ],

    exitOnError: false
}); */
export default logger;

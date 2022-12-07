import winston from 'winston'

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true
  }),
  winston.format.label({
    label: '-> [LOGGER]'
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:MM:SS'
  }),
  winston.format.printf(
    info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
)
const format = winston.format.combine(

  winston.format.label({
    // label:'-> [LOGGER]'
  }),
  winston.format.timestamp({
    format: 'HH:mm:ss'
  }),
  winston.format.printf(

    info => `[${info.timestamp}]${info.level.charAt(0)}: ${info.message}`
  )
)

// noinspection JSCheckFunctionSignatures
const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)

    }),
    new winston.transports.File(
      {
        filename: 'app.log',
        format: format

      })
    // new winston.transports.File({level:'error', filename: 'error.log' ,format:format}),
    /* new winston.transports.Mail({
          to:'laurent.morissette@gmail.com',
          host:'smtp.gmail.com',
          username:'laurent.morissette@gmail.com',
          password:'Linda2254@',
          level:'error',
          ssl:true,
          tls:true

        }) */

  ]

})
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
export default logger

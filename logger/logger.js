const winston = require('winston');

function getCustomLogLevels() {
  return {
    levels: {
      error: 1,
      warn: 2,
      info: 3,
      verbose: 4,
      debug: 5,
      silly: 6,
    },
    colors: {
      error: 'red',
      warn: 'orange',
      info: 'yellow',
      debug: 'blue',
      verbose: 'white',
      silly: 'purple',
    },
  };
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json(),
    winston.format.align(),
    winston.format.printf((info) => {
      let msg = `${info.timestamp}`;
      msg = `${msg}: ${info.level}`;
      msg = `${msg}: ${info.message.trim()}`;
      return msg;
    })
  ),
  levels: getCustomLogLevels().levels,
  transports: [
    new winston.transports.File({
      filename: `./logs/info.log`,
      level: 'info',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: `./logs/warn.log`,
      level: 'warning',
    }),
    new winston.transports.File({
      filename: `./logs/error.log`,
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.colorize(),
        winston.format.align(),
        winston.format.printf((info) => {
          let msg = `${info.timestamp}`;
          msg = `${msg}: ${info.level}`;
          msg = `${msg}: ${info.message.trim()}`;
          return msg;
        })
      ),
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

winston.addColors(getCustomLogLevels().colors);

module.exports = logger;

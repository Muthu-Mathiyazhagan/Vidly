require('express-async-errors')

module.exports = function () {
  // Below two methods also catch all uncaughtException && unhandledRejection
  // uncaughtException && unhandledRejection Raw Method Starts Here
  process.on('uncaughtException', ex => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION')
    console.error(ex.message, ex)
  })
  process.on('unhandledRejection', ex => {
    console.log('WE GOT AN UNHANDLED REJECTION')
    console.error(ex.message, ex)
  })
  // uncaughtException && unhandledRejection Raw Method Ends Here
  // uncaughtException && unhandledRejection winston Method Starts Here
  /*
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtException.log' })
  )
  process.on('unhandledRejection', ex => {
    throw ex
  })
  // uncaughtException && unhandledRejection winston Method Ends Here

  winston.add(winston.transports.File, { filename: 'logfile.log' })
  winston.add(winston.transports.MongoDB, {
    db: process.env.dbUri,
    level: 'info'
  }) */
}

const winston = require('winston');
require('winston-mongodb');

module.exports = function name() {
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: process.env.dbUri,
        level: 'info'
    });

    process.on('uncaughtException', (ex) => {
        console.log("WE GOT AN UNCAUGHT EXCEPTION");
        winston.error(ex.message, ex);
    });


    process.on('unhandledRejection', (ex) => {
        console.log("WE GOT AN UNHANDLED REJECTION");
        winston.error(ex.message, ex);
    });
}
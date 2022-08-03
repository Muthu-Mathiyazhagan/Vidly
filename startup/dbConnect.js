const mongoose = require("mongoose");
const winston = require('winston');
const DbStatus = ["Disconnected", "Connected", "connecting", "disconnecting"];
require("dotenv").config();



module.exports = function () {

    console.log(`process.env.dbUri : ${process.env.dbUri}`);

    mongoose
        .connect(process.env.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            winston.info(
                "Mongo DB Conection Status : ",
                DbStatus[mongoose.connection.readyState]
            );
            console.log(new Date().toLocaleString("ta-IN"));
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });

}
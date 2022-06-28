const mongoose = require("mongoose");
const winston = require('winston');
const DbStatus = ["Disconnected", "Connected", "connecting", "disconnecting"];


module.exports = function () {
    mongoose
        .connect(process.env.dbUri)
        .then(() => {
            winston.info(
                "Mongo DB Conection Status : ",
                DbStatus[mongoose.connection.readyState]
            );
            console.log(new Date().toLocaleString("ta-IN"));
        })

}
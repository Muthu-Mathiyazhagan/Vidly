const mongoose = require("mongoose");
const DbStatus = ["Disconnected", "Connected", "connecting", "disconnecting"];


module.exports = function () {
    mongoose
        .connect(process.env.dbUri)
        .then(() => {
            console.log(
                "Mongo DB Conection Status : ",
                DbStatus[mongoose.connection.readyState]
            );
        })
        .catch(() => {
            console.log(
                "Mongo DB Conection Status : ",
                DbStatus[mongoose.connection.readyState]
            );
        });
}
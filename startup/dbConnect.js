const mongoose = require("mongoose");
const DbStatus = ["Disconnected", "Connected", "connecting", "disconnecting"];
require("dotenv").config();



module.exports = function () {

    console.log(`process.env.dbUri : ${process.env.dbUri}`);

    mongoose
        .connect(process.env.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(
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
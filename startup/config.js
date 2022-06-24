// require("dotenv").config();

module.exports = function () {
    // console.log("process.env.vidly_jwtPrivateKey : ", process.env.vidly_jwtPrivateKey);
    if (!process.env.vidly_jwtPrivateKey) {
        throw new Error("FATAL ERROR: JWT private key not defined in environment variable of the Machine");
    }
}
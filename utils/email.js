const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
    console.log(`process.env.SENDERMAIL : ${process.env.SENDERMAIL}`);
    console.log(process.env.PASS);
    console.log(process.env.HOST);
    console.log(process.env.SERVICE);
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDERMAIL,
                pass: process.env.PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: text,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};


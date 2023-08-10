import { config } from "../config/config";
import nodemailer from 'nodemailer';

console.log(config.mail.email);
console.log(config.mail.password);


const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail.email,
        pass: config.mail.password
    }
});

export default mailTransporter;
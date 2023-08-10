
import sgMail from '@sendgrid/mail';
import { config } from "../config/config";
sgMail.setApiKey(config.transportKey);



export default sgMail;
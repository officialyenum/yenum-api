import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import { app } from './app';

dotenv.config(); // load .env file

// Setup Mongoose
mongoose
    .connect(config.mongo.url, {
        retryWrites: true,
        w: 'majority'
    })
    .then(() => {
        Logging.info('Connected to MongoDB');

        const PORT = process.env.PORT || 4000;

        app.listen(PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        Logging.error('Unable to connect to MongoDB');
        Logging.error(err);
    });


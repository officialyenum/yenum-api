import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import * as routes from './routes';

dotenv.config(); // load .env file

const app = express();

// Setup express layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');

// Setup static files
app.set('views', path.join(__dirname, 'views')); // specify the views directory
app.use(express.static(path.join(__dirname, 'public'))); // specify the static assets directory

/** Register Routes */
routes.register(app);

export { app };
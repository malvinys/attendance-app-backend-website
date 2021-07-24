import http from 'http';
import express from 'express';
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import mongoose from 'mongoose';

import config from './config/config';
import logging from './config/logging';

/** import Routes */
import TokenRoutes from "./routes/TokenRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import LookupRoutes from "./routes/LookupRoutes";
import UsersRoutes from "./routes/UsersRoutes";
import ActivityRoutes from "./routes/ActivityRoutes";

import { checkAuthJwt } from './middleware/AuthMiddleware';

const app = express();

/** Server Handling */
const httpServer = http.createServer(app);

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then(() => {
        logging.info('Mongo Connected');
    })
    .catch((error) => {
        logging.error(`Mongo Not Connected - ${error.message}`);
    });

/** Log the request */
app.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.originalUrl}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});

/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Rules of our API */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
app.use(express.static('public'));
app.use('/api/v1/token', TokenRoutes);
app.use('/api/v1/auth', checkAuthJwt, AuthRoutes);
app.use('/api/v1/lookup', checkAuthJwt, LookupRoutes);
app.use('/api/v1/users', checkAuthJwt, UsersRoutes);
app.use('/api/v1/activity', checkAuthJwt, ActivityRoutes);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

/** Listen */
httpServer.listen(config.server.port, () => logging.info(`Server is running ${config.server.hostname}:${config.server.port}`));

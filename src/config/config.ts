import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'DEV';

const MONGO_HOST = process.env.MONGO_URL || `localhost:27017`;
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'supersecretpassword';
const MONGO_DATABASE = process.env.MONGO_DATABASE || 'dbname';

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false
};
const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT_PROD = process.env.SERVER_PORT_PROD || 8080;
const SERVER_PORT_DEV = process.env.SERVER_PORT_DEV || 8080;
const SERVER_PORT = NODE_ENV === 'DEV' ? SERVER_PORT_DEV : SERVER_PORT_PROD;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
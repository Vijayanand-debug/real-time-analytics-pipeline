import dotenv from 'dotenv';
dotenv.config();
export const kafkaBrokers = process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'];
export const port = process.env.PORT || 3000;
export const processType = process.env.PROCESS_TYPE;
export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myuser',
    password: process.env.DB_PASSWORD || 'mypassword',
    database: process.env.DB_NAME || 'analytics_data',
    port: parseInt(process.env.DB_PORT || '5432'),
};

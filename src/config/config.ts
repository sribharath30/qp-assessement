import dotenv from 'dotenv';
dotenv.config();

const config = {
    development: {
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_DATABASE || '',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || null,
        database: `${process.env.DB_DATABASE}_test` || '',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || null,
        database: `${process.env.DB_DATABASE}_prod` || '',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'postgres',
    },
};

module.exports = config;

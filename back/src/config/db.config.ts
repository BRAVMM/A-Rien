/**
 * @fileoverview Database configuration
 */

/* Check environment variables */
const ENV_VARS = [
    {"DB_HOST": process.env.DB_HOST},
    {"DB_USER": process.env.DB_USER},
    {"DB_PASS": process.env.DB_PASS},
    {"DB_NAME": process.env.DB_NAME},
    {"DB_PORT": process.env.DB_PORT},
];

ENV_VARS.forEach((envVar) => {
    const [key, value] = Object.entries(envVar)[0];

    if (!value) {
        throw new Error(`${key} is not defined in the environment variables`);
    }
});


export const databaseConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT),
  dialect: "postgres",
  pool: {
      max: 5, // maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
  }
} as const;

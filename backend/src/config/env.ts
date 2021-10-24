import * as dotenv from "dotenv-safe";
dotenv.config();

export interface Config {
  database: {
    username: string;
    password: string;
    tableName: string;
    port: number;
    host: string;
  };
  apiPort: number;
}

export default (): Config => ({
  database: {
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    tableName: process.env.DATABASE_TABLE_NAME!,
    port: parseInt(process.env.DATABASE_PORT!, 10),
    host: process.env.DATABASE_HOST!,
  },
  apiPort: parseInt(process.env.API_PORT!, 10),
});

import { LogModel } from "../model/log";
import { createConnection } from "typeorm";
import { Config } from "./env";

export default async ({ database }: Config) => {
  try {
    const connection = await createConnection({
      type: "postgres",
      synchronize: true,
      host: "db",
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.tableName,
      entities: [LogModel],
    });

    return connection;
  } catch (err) {
    console.error(err);
  }
};

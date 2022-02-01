import * as express from "express";
import * as cors from "cors";
import router from "./api/router";
import createConnection from "./config/db";
import createConfig from "./config/env";
import { NotFoundError } from "./errors/not-found.error";
import errorHandler from "./middleware/error-handler";
import { LogModel } from "./model/log.model";
import { LogRepository } from "./repositories/log.repository";
import { Env } from "./types/env";
import { Severity } from "./types/severity";

const config = createConfig();

(async () => {
  await createConnection(config);
})();

//initialize express stuff
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router());
app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));
app.use(errorHandler);

// temporary code to insert recent logs for testing
const strings = ["Debug", "Error", "Info", "Warning"] as Severity[];
const envs = ["Prd", "Acc", "Dev"];
const sentences = [
  "Many Corgis are Born Without Tails",
  "Corgis are Great Watchdogs",
  "Corgi Means ‘Dwarf Dog’",
  "Myth Says Corgis Came from Fairies",
  "Corgis Have a Double Coat",
  "Corgis Come in Lots of Colors",
  "Corgis Got Low-Maintenance Hair",
  "They Share Ancestry with Huskies",
  "Vikings Loved Them",
  "Stealing a Corgi = Fines",
  "Corgis are Very Intelligent",
];

const sources = ["Corgi", "Ari", "Coco"];

setInterval(async () => {
  const logRepository = new LogRepository();
  logRepository.insertLogs([
    LogModel.create({
      severity: strings[Math.floor(Math.random() * strings.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      logData: JSON.stringify({
        message: sentences[Math.floor(Math.random() * sentences.length)],
      }),
      env: envs[Math.floor(Math.random() * envs.length)] as Env,
      timestamp: new Date(),
    }),
  ]);
}, 1000 * 60);

app.listen(config.apiPort, () =>
  console.log(`Listening on port ${config.apiPort}`)
);

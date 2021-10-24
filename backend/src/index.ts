import * as express from "express";
import router from "./api/router";
import createConnection from "./config/db";
import createConfig from "./config/env";
import { NotFoundError } from "./errors/not-found.error";
import errorHandler from "./middleware/error-handler";

const config = createConfig();

(async () => {
  await createConnection(config);
})();

//initialize express stuff
const app = express();

app.use(express.json());
app.use("/api", router());
app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));
app.use(errorHandler);

app.listen(config.apiPort, () =>
  console.log(`Listening on port ${config.apiPort}`)
);

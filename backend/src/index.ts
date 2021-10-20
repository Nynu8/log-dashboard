import * as express from "express";

const port = 3000;
const app = express();

app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {});

import { Router } from "express";
import getLogs from "./get-logs";
import postLogs from "./post-logs";

export default (): Router => {
  const router = Router();
  router.get("/logs", (req, res, next) => getLogs(req, res, next));
  router.post("/logs", (req, res, next) => postLogs(req, res, next));

  return router;
};

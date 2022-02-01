import { Env } from "../../types/env";
import { Severity } from "../../types/severity";
import { LogRepository } from "../../repositories/log.repository";
import { LogModel } from "../../model/log.model";

export interface PostLogsInput {
  data: {
    timestamp: Date;
    severity: Severity;
    source: string;
    logData: string;
    env: Env;
  }[];
  logRepository: LogRepository;
}

export default async ({ data, logRepository }: PostLogsInput) => {
  const newLogs = data.map((log) => LogModel.create(log));
  const logs = await logRepository.insertLogs(newLogs);

  return logs;
};

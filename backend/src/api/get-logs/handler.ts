import { LogRepository } from "../../repositories/log.repository";

interface HandlerDependencies {
  logRepository: LogRepository;
}

export default async ({ logRepository }: HandlerDependencies) => {
  const logs = await logRepository.getLogs();
  return logs;
};

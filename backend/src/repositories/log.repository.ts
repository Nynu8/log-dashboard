import { LogModel } from "../model/log.model";
import { getRepository, Repository } from "typeorm";

export class LogRepository {
  private logsRepository: Repository<LogModel>;

  constructor() {
    this.logsRepository = getRepository(LogModel);
  }

  async getLogs() {
    const logs = await this.logsRepository.find({
      order: { timestamp: "DESC" },
    });

    return logs;
  }

  insertLogs(logs: LogModel[]) {
    return this.logsRepository.save(logs);
  }
}

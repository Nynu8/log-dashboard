import { Env } from "../types/env";
import { Severity } from "../types/severity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface LogProps {
  id?: string;
  timestamp?: Date;
  severity: Severity;
  source: string;
  logData: string;
  env: Env;
}

@Entity()
export class LogModel {
  static create(props: Partial<LogProps>) {
    const logEntry = new LogModel();
    Object.assign(logEntry, props);

    return logEntry;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  severity: Severity;

  @Column("varchar")
  source: string;

  @Column("varchar")
  env: string;

  @Column("json")
  logData: string;

  @Column("timestamp", { default: new Date().toUTCString() })
  timestamp: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface LogProps {
  id?: string;
  logData: string;
  timestamp?: Date;
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

  @Column("json")
  logData: string;

  @Column("bigint", { default: Date.now() })
  timestamp: number;
}

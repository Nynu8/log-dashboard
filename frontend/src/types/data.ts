import { Env } from './env';
import { Severity } from './severity';

export interface LogEntry {
  id: string;
  env: Env;
  timestamp: string;
  severity: Severity;
  source: string;
  logData: string;
}

export type Data = LogEntry[];

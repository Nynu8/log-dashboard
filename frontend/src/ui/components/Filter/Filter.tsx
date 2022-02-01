import { Dispatch, SetStateAction } from 'react';
import { Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { LogEntry } from 'types/data';
import { Env } from 'types/env';
import { Severity } from 'types/severity';

export interface Filters {
  env: Env | '';
  severity: Severity | '';
  source: string;
}

export interface FilterProps {
  setFilters: Dispatch<SetStateAction<Filters>>;
  filters: Filters;
  data: LogEntry[];
}

export default function Filter({ data, filters, setFilters }: FilterProps) {
  const handleEnvClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLInputElement;

    if (value === filters.env) {
      setFilters({
        ...filters,
        env: '',
      });
    } else {
      setFilters({
        ...filters,
        env: value as Env,
      });
    }
  };

  const handleSeverityClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLInputElement;

    if (value === filters.severity) {
      setFilters({
        ...filters,
        severity: '',
      });
    } else {
      setFilters({
        ...filters,
        severity: value as Severity,
      });
    }
  };

  const handleSourceClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = event.target as HTMLInputElement;

    if (value === filters.source) {
      setFilters({
        ...filters,
        source: '',
      });
    } else {
      setFilters({
        ...filters,
        source: value,
      });
    }
  };

  const getUniqueSources = () => [...new Set(data.map((log) => log.source))];

  return (
    <>
      <h2>Environment</h2>
      <RadioGroup name="env" value={filters.env ?? ''}>
        <FormControlLabel value="Dev" control={<Radio onClick={handleEnvClick} />} label="Development" />
        <FormControlLabel value="Acc" control={<Radio onClick={handleEnvClick} />} label="Acceptance" />
        <FormControlLabel value="Prd" control={<Radio onClick={handleEnvClick} />} label="Production" />
      </RadioGroup>
      <RadioGroup name="source"></RadioGroup>
      <Divider />
      <h2>Severity</h2>
      <RadioGroup name="severity" value={filters.severity ?? ''}>
        <FormControlLabel value="Error" control={<Radio onClick={handleSeverityClick} />} label="Error" />
        <FormControlLabel value="Warning" control={<Radio onClick={handleSeverityClick} />} label="Warning" />
        <FormControlLabel value="Info" control={<Radio onClick={handleSeverityClick} />} label="Info" />
        <FormControlLabel value="Debug" control={<Radio onClick={handleSeverityClick} />} label="Debug" />
      </RadioGroup>
      <RadioGroup name="source"></RadioGroup>
      {getUniqueSources().length > 0 && (
        <>
          <Divider />
          <h2>Source</h2>
          <RadioGroup name="source" value={filters.source ?? ''}>
            {getUniqueSources().map((source) => (
              <FormControlLabel
                value={source}
                control={<Radio onClick={handleSourceClick} />}
                label={source}
                key={source}
              />
            ))}
          </RadioGroup>
        </>
      )}
    </>
  );
}

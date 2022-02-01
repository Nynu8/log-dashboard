import { render, screen, fireEvent } from '@testing-library/react';

import { Logs } from './Logs';
import { LogEntry } from 'types/data';

const setSelectedLog = jest.fn();

test('opens dialog when clicked on log', () => {
  const data = [
    {
      env: 'Dev',
      logData: 'message',
      severity: 'Error',
      source: 'Doggo',
      timestamp: new Date().toISOString(),
      id: 'uuid',
    },
  ] as LogEntry[];
  render(<Logs data={data} setSelectedLog={setSelectedLog} />);

  const element = screen.getByText(/Doggo/i);
  fireEvent.click(element);

  expect(setSelectedLog).toBeCalled();
});

test('pagination exists when there are over 50 records', () => {
  const data = [...Array(90).keys()].map((_x) => ({
    env: 'Dev',
    logData: 'message',
    severity: 'Error',
    source: 'Doggo',
    timestamp: new Date().toISOString(),
    id: 'uuid',
  })) as LogEntry[];

  render(<Logs data={data} setSelectedLog={setSelectedLog} />);

  const element = screen.getByText(/of 90/i);
  expect(element).toBeInTheDocument();
});

import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import StopIcon from '@mui/icons-material/Stop';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import Title from '../Title/Title';
import { Data, LogEntry } from 'types/data';
import { Severity } from 'types/severity';

export interface LogsProps {
  data: Data;
  setSelectedLog: Dispatch<SetStateAction<LogEntry | null>>;
}

const styles = {
  icon: {
    transform: 'scale(3)',
    marginRight: 10,
  },
  tableRow: {
    cursor: 'pointer',
  },
};

const rowsPerPage = 50;

export const Logs = ({ data, setSelectedLog }: LogsProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageLogs, setCurrentPageLogs] = useState([] as Data);

  const mapSeverityToColor = (severity: Severity) => {
    switch (severity) {
      case 'Debug':
        return 'disabled';
      case 'Info':
        return 'info';
      case 'Error':
        return 'error';
      case 'Warning':
        return 'warning';
    }
  };

  useEffect(() => {
    setCurrentPageLogs(data.slice(rowsPerPage * currentPage, rowsPerPage * currentPage + rowsPerPage));
  }, [currentPage, data]);

  useEffect(() => {
    if (data.length > rowsPerPage) {
      setCurrentPageLogs(data.slice(rowsPerPage * currentPage, rowsPerPage * currentPage + rowsPerPage));
    } else {
      setCurrentPageLogs(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  return (
    <Fragment>
      <Title>Logs</Title>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Severity</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Environment</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPageLogs.map((log) => (
            <TableRow key={log.id} onClick={() => setSelectedLog(log)} hover={true} style={styles.tableRow}>
              <TableCell>
                <StopIcon color={mapSeverityToColor(log.severity)} fontSize="inherit" style={styles.icon} />
                {log.severity}
              </TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.env}</TableCell>
              <TableCell>{log.source}</TableCell>
              <TableCell>{log.logData}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPage={rowsPerPage}
              page={currentPage}
              count={data.length}
              onPageChange={(_event, page) => setCurrentPage(page)}
              rowsPerPageOptions={[-1]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Fragment>
  );
};

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Logs } from 'ui/components/Logs/Logs';
import apiClient from '../../tools/api-client';
import Filter, { Filters } from 'ui/components/Filter/Filter';
import { Search } from 'ui/components/Search/Search';
import { Datepicker, DateSelectionType } from 'ui/atoms/datepicker/Datepicker';
import { Data, LogEntry } from 'types/data';
import MessageDialog from 'ui/components/MessageDialog/MessageDialog';

export const Dashboard = () => {
  const [allData, setAllData] = useState([] as Data);
  const [visibleData, setVisibleData] = useState([] as Data);
  const [search, setSearch] = useState('');
  const [selectionType, setSelectionType] = useState('15 minutes' as DateSelectionType);
  const [filters, setFilters] = useState({
    env: '',
    severity: '',
    source: '',
  } as Filters);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null as LogEntry | null);

  const filterByDate = (data: Data) =>
    data.filter((log) => {
      if (selectionType === 'All') {
        return true;
      }

      if (
        DateTime.fromISO(log.timestamp).plus({
          minutes: selectionType === '15 minutes' ? 15 : selectionType === '30 minutes' ? 30 : 0,
          hours: selectionType === '1 hour' ? 1 : selectionType === '4 hours' ? 4 : 0,
          days: selectionType === '1 day' ? 1 : selectionType === '3 days' ? 3 : 0,
          weeks: selectionType === '1 week' ? 1 : selectionType === '2 weeks' ? 2 : 0,
        }) > DateTime.now()
      ) {
        return true;
      }
      return false;
    });

  const filterByFilters = (data: Data) => {
    let logsToFilter = data;

    if (search.length > 0) {
      logsToFilter = logsToFilter.filter((log) => log.logData.toLowerCase().includes(search.toLowerCase()));
    }

    if (filters.env !== '') {
      logsToFilter = logsToFilter.filter((log) => log.env === filters.env);
    }

    if (filters.severity !== '') {
      logsToFilter = logsToFilter.filter((log) => log.severity === filters.severity);
    }

    if (filters.source !== '') {
      logsToFilter = logsToFilter.filter((log) => log.source === filters.source);
    }

    return logsToFilter;
  };

  const fetchDefaultLogs = async () => {
    const allData = await apiClient.getLogs();
    setAllData(allData);

    const filteredData = filterByFilters(filterByDate(allData));
    setVisibleData(filteredData);
  };

  useEffect(() => {
    fetchDefaultLogs();

    setInterval(() => {
      fetchDefaultLogs();
    }, 10 * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setVisibleData(filterByFilters(filterByDate(allData)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allData, search, filters, selectionType]);

  useEffect(() => {
    if (!messageDialogOpen) {
      setSelectedLog(null);
    }
  }, [messageDialogOpen]);

  useEffect(() => {
    if (selectedLog) {
      setMessageDialogOpen(true);
    }
  }, [selectedLog]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} direction="row" columns={16}>
            <Grid item xs={3}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Filter data={visibleData} filters={filters} setFilters={setFilters} />
              </Paper>
            </Grid>
            <Grid item xs={13}>
              <Grid container spacing={3}>
                <Grid item xs={16}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      height: 100,
                    }}
                  >
                    <Grid container spacing={3} direction="row">
                      <Grid item xs={12}>
                        <Search setSearch={setSearch} />
                      </Grid>
                      <Grid item xs={4}>
                        <Datepicker selectionType={selectionType} setSelectionType={setSelectionType} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* <Grid item xs={16}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    Chart
                  </Paper>
                </Grid> */}
                <Grid item xs={16}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Logs data={visibleData} setSelectedLog={setSelectedLog} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <MessageDialog open={messageDialogOpen} setOpen={setMessageDialogOpen} log={selectedLog} />
    </Box>
  );
};

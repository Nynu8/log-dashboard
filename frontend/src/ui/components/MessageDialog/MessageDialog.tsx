import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LogEntry } from 'types/data';

interface MessageDialogProps {
  log: LogEntry | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MessageDialog({ log, open, setOpen }: MessageDialogProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const parseLogMessage = (message: string) => {
    try {
      const parsedJson = JSON.parse(message);
      return JSON.stringify(parsedJson, null, 2);
    } catch (err) {
      return message;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogContent>
          <Grid container spacing={3} direction="column" columns={12}>
            <Grid item xs={12}>
              <Grid container spacing={3} direction="row" columns={12}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Log ID
                  </Typography>
                  <Typography variant="subtitle1">{log?.id || ''}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Timestamp
                  </Typography>
                  <Typography variant="subtitle1">
                    {log?.timestamp ? new Date(log?.timestamp).toLocaleString() : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3} direction="row" columns={12}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Severity
                  </Typography>
                  <Typography variant="subtitle1">{log?.severity || ''}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Environment
                  </Typography>
                  <Typography variant="subtitle1">{log?.env || ''}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Source
                  </Typography>
                  <Typography variant="subtitle1">{log?.source || ''}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} style={{ marginTop: 24 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Message
                </Typography>
                <pre>{parseLogMessage(log?.logData || '')}</pre>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

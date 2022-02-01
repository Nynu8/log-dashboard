import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export type DateSelectionType =
  | '15 minutes'
  | '30 minutes'
  | '1 hour'
  | '4 hours'
  | '1 day'
  | '3 days'
  | '1 week'
  | '2 weeks'
  | 'All';

interface DatepickerProps {
  selectionType: DateSelectionType;
  setSelectionType: Dispatch<SetStateAction<DateSelectionType>>;
}

export const Datepicker = ({ selectionType, setSelectionType }: DatepickerProps) => {
  const handleDateChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setSelectionType(value as DateSelectionType);
  };

  return (
    <FormControl>
      <InputLabel id="datepicker">Time range</InputLabel>
      <Select
        labelId="datepicker"
        id="datepicker"
        value={selectionType}
        label="Datepicker"
        onChange={handleDateChange}
        style={{ width: 300 }}
      >
        <MenuItem value={'15 minutes'}>15 minutes</MenuItem>
        <MenuItem value={'30 minutes'}>30 minutes</MenuItem>
        <MenuItem value={'1 hour'}>1 hour</MenuItem>
        <MenuItem value={'4 hours'}>4 hours</MenuItem>
        <MenuItem value={'1 day'}>1 day</MenuItem>
        <MenuItem value={'3 days'}>3 days</MenuItem>
        <MenuItem value={'1 week'}>1 week</MenuItem>
        <MenuItem value={'2 weeks'}>2 weeks</MenuItem>
        <MenuItem value={'All'}>All</MenuItem>
      </Select>
    </FormControl>
  );
};

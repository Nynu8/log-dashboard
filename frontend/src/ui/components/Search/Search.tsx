import { TextField } from '@mui/material';
import { SetStateAction, Dispatch, KeyboardEvent, useState, ChangeEvent } from 'react';

export interface SearchProps {
  setSearch: Dispatch<SetStateAction<string>>;
}

export const Search = ({ setSearch }: SearchProps) => {
  const [phrase, setPhrase] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPhrase(value);
  };

  const submitChange = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(phrase);
    }
  };

  return (
    <TextField
      id="search"
      label="Search"
      variant="standard"
      fullWidth
      onChange={handleChange}
      onKeyDown={submitChange}
      value={phrase}
    />
  );
};

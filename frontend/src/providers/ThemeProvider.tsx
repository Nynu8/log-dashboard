import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
h7 {
  margin: 0;
}

*, *:before, *:after {
  box-sizing: border-box;
}
`;

const theme = {
  colors: {
    lightGray: '#E0E4E8',
    red: '#9F6566',
    orange: '#CF9F5D',
    black: '#000000',
  },
} as const;

type Theme = typeof theme;
export type Colors = keyof Theme['colors'];

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={mdTheme}>
      <GlobalStyle />
      {children}
    </MuiThemeProvider>
  );
};

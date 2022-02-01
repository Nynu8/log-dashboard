import { ReactNode } from 'react';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';

type ProviderProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider>
      <RouterProvider>{children}</RouterProvider>
    </ThemeProvider>
  );
};

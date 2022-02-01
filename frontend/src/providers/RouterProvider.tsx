import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

type RouterProvidersProps = {
  children: ReactNode;
};

export const RouterProvider = ({ children }: RouterProvidersProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

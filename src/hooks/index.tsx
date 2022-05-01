import React from 'react';
import { AuthProvider } from './auth';
import { useTheme, ThemeProviderC } from './theme';
import { ToastProvider } from './toast';
import darkTheme from '../styles/themes/dark';
import lightTheme from '../styles/themes/light';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProviderC>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </ThemeProviderC>
);

export default AppProvider;

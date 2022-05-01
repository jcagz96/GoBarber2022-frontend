import React from 'react';
import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;

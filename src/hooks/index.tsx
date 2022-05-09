import React from 'react';
import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';
import { SocketProvider } from './socket';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider>
    <AuthProvider>
      <SocketProvider>
        <ToastProvider>{children}</ToastProvider>
      </SocketProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default AppProvider;

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';
import { SocketProvider } from './socket';
import i18n from '../locales/i18n';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <SocketProvider>
          <ToastProvider>{children}</ToastProvider>
        </SocketProvider>
      </AuthProvider>
    </I18nextProvider>
  </ThemeProvider>
);

export default AppProvider;

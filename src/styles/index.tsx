import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTheme } from '../hooks/theme';
import GlobalStyle from './global';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';

const GlobalComponent: React.FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

export default GlobalComponent;

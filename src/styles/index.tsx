import React from 'react';
import { useTheme } from '../hooks/theme';
import GlobalStyle from './global';

const GlobalComponent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <GlobalStyle theme={theme} />
    </>
  );
};

export default GlobalComponent;

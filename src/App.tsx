import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalComponent from './styles/index';
import AppProvider from './hooks/index';
import RoutesComponent from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
      <GlobalComponent />
    </AppProvider>
  </>
);

export default App;

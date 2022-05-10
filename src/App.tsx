import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalComponent from './styles/index';
import AppProvider from './hooks/index';
import RoutesComponent from './routes';
// import './locales/i18n';

const App: React.FC = () => (
  <>
    <AppProvider>
      <GlobalComponent>
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
      </GlobalComponent>
    </AppProvider>
  </>
);

export default App;

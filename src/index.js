import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import ErrorBoundry from './components/error-boundry';
import sofService from './services/sof-service';
import { SofServiceProvider } from './components/sof-service-context';
import { BrowserRouter as Router} from 'react-router-dom';

import store from './store';

import App from './components/app';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <SofServiceProvider value={sofService}>
        <Router>
          <App />
        </Router>
      </SofServiceProvider>
    </ErrorBoundry>
  </Provider>
, document.getElementById('root'));
  
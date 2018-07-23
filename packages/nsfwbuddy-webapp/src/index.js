import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { routerMiddleware } from 'react-router-redux'
import createStore from './core/create-store';
import createHistory from 'history/createBrowserHistory'
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import it from './l10n/locale-data/it';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

addLocaleData([...en, ...it]);

const history = createHistory()
const store = createStore(
  routerMiddleware(history)
);

ReactDOM.render(
  <App history={history} store={store} />,
  document.getElementById('root')
);

registerServiceWorker();

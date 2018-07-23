import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import Shell from '../Shell';

export default ({history, store}) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' component={Shell} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

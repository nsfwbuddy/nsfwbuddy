import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Redirect from './containers/Redirect';
import CreateLink from './containers/CreateLink';
import NotFound from './containers/NotFound';
import Information from './containers/Information';
import Privacy from './containers/Privacy';

const Routes = props =>
  <Switch>
    <Route exact path='/' component={CreateLink} />
    <Route exact path='/information' component={Information} />
    <Route exact path='/privacy' component={Privacy} />
    <Route exact path= '/404' component={NotFound} />
    <Route path='/:shortURL' component={Redirect} />
  </Switch>

export default Routes;

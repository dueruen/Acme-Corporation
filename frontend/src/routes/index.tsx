import React, { FC } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';

import Login from '../pages/admin/Login';
import List from '../pages/admin/List';
import Landing from '../pages/Landing';
import ProtectedRoute from './ProtectedRoute';

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
}) 

const BaseRouter: FC = () => {
    
    return (
      <Router history={history}>
          <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute path={`/admin`} component={List}/>
              <Route exact path="/" component={Landing} />
              <Route component={() => <div>Siden bliv ikke fundet</div>}/>
          </Switch>
      </Router>
    );
}

export default BaseRouter;
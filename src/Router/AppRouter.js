import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import NavBar from '../components/navigation/NavBar';
import PrivateRoute from '../components/auth/PrivateRoute';

const AppRouter = ({ isLoading, user }) => (
  <Router>
    <NavBar user={user} />
    <Switch>
      {routes.map((route, index) => {
        if (route.private) {
          return (
            <PrivateRoute
              key={index}
              path={route.path}
              exact={route.exact}
              isLoading={isLoading}
              isLoggedIn={!!user}
            >
              <route.Component />
            </PrivateRoute>
          );
        } else {
          return (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.Component />
            </Route>
          );
        }
      })}
    </Switch>
  </Router>
);

export default AppRouter;

import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect,} from "react-router-dom";
import LoginPage from './pages/Login/Login';
import UsersPage from './pages/Users/Users';
import UserPage from './pages/User/User';

const authGuard = (Component) => () => {
  return localStorage.getItem("token") ? (<Component />) : (<Redirect to="/login" />);
};

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/users" render={authGuard(UsersPage)}></Route>
      <Route path="/user/:id" render={authGuard(UserPage)} con></Route>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      {/* <Route path="*">
        <NotFound />
      </Route> */}
    </Switch>
  </Router>
);

export default Routes;

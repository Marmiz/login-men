import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App.js';
import HomePage from './components/HomePage';
import SignUp from './containers/SignUpPage';
import LogIn from './containers/LogInPage';
import LogOut from './containers/LogOutPage';
import Dashboard from './containers/DashboardPage';
import Auth from './modules/Auth';

// import routes from './routes.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'


// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const Root = () => (
  <MuiThemeProvider>
    <Router>
      <App>
        {Auth.isUserAuthenticated() ? (
          <Redirect to="/dashboard" />
        ) :(
          <Redirect to="/"/>
      )}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/logout" component={LogOut} />
      </App>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

// ReactDom.render((
//   <MuiThemeProvider muiTheme={getMuiTheme()}>
//     <Router  routes={routes} />
//   </MuiThemeProvider>), document.getElementById('root'));

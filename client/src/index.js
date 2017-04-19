import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App.js';
import HomePage from './components/HomePage';
import SignUp from './containers/SignUpPage';
import routes from './routes.js';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'


// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const Root = () => (
  <MuiThemeProvider>
    <Router>
      <App>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignUp} />
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

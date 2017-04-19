import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';



// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <HomePage />
//       </div>
//     );
//   }
// }
//
const App = ({children}) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">React App</Link>
      </div>

      <div className="top-bar-right">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>

    </div>

    <div>
      {children}
    </div>

  </div>
);

App.propTypes = {
  children: PropTypes.array.isRequired
};

export default App;

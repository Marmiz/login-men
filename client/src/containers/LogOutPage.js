import React, {Component} from 'react';
import Auth from '../modules/Auth';
import { Redirect } from 'react-router-dom';

class LogOutPage extends Component{
  componentDidMount(){
    Auth.deauthenticateUser();
  }

  render(){
    return(
      <Redirect to="/" />
    )
  }

}

export default LogOutPage;

import React, {Component} from 'react';
import LogInForm from '../components/LogInForm'

class LogInPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

  };

  processForm(event){
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
          //success
          this.setState({ errors: {} });
          console.log('The form is valid');
      }else{
        //failure
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({ errors });
      }
    }); //load

    xhr.send(formData);
  };

  changeUser(event){
    const field = event.target.name;
    const user = this.state.user;

    user[field] = event.target.value;

    this.setState({
      user
    });
  };

  render(){
    return(
      <LogInForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
};

export default LogInPage;

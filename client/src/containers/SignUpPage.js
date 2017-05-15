import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.changeUser = this.changeUser.bind(this);
    this.processForm = this.processForm.bind(this);
  };

  changeUser(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    })
  };

  processForm(event){
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200){
        // success
        this.setState({ errors: {} });
        // console.log('Form is valid');

        // set a messagge
        localStorage.setItem('succesMessage', xhr.response.message);
        // redirect
        this.context.router.replace('/login');

      }else{
        //errors
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({ errors });
      }
    }); //load

    xhr.send(formData);
  };

  render(){
    return (
        <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        />
    )
  }
};

export default SignUpPage;

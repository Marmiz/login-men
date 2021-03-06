import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/card';
import RaisedButton from 'material-ui/raisedButton';
import TextField from 'material-ui/textField';

class SignUpForm extends Component {

  render(){
    return (
      <Card className="container">
        <form action="/" onSubmit={this.props.onSubmit}>
           <h2 className="card-heading">Sign Up</h2>

           {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

           <div className="field-line">
             <TextField
               floatingLabelText="Name"
               name="name"
               errorText={this.props.errors.name}
               onChange={this.props.onChange}
               value={this.props.user.name}
             />
           </div>

           <div className="field-line">
            <TextField
            floatingLabelText="Email"
            name="email"
            errorText={this.props.errors.email}
            onChange={this.props.onChange}
            value={this.props.user.email}
            />
           </div>

           <div className="field-line">
            <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={this.props.onChange}
            errorText={this.props.errors.password}
            value={this.props.user.password}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary />
          </div>

          <CardText>Already have an account? <Link to="/login">Log in</Link>.</CardText>
        </form>
      </Card>
    )
  }
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;

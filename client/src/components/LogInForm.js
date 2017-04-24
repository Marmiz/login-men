import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/card';
import RaisedButton from 'material-ui/raisedButton';
import TextField from 'material-ui/textField';

// decalre this as a function, mainly for practice

const LogInForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Log In</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
       <TextField
       floatingLabelText="Password"
       type="password"
       name="password"
       onChange={onChange}
       errorText={errors.password}
       value={user.password}
       />
     </div>

     <div className="button-line">
       <RaisedButton type="submit" label="Log In" primary />
     </div>

     <CardText>Don't have an account? <Link to="/signup">Sign Up</Link>.</CardText>


    </form>
  </Card>
);

LogInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default LogInForm;

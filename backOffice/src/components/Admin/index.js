import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import './admin.scss';

const Admin = ({
  emailValue,
  passwordValue,
  errorEmail,
  errorPassword,
  setAdminPageFields,
  submitAdminConnectForm,
}) => (
  <div className="admin">
    <form
      className="admin-box"
      onSubmit={(event) => {
        event.preventDefault();
        submitAdminConnectForm();
      }}
    >
      <h1 className="admin-box-item admin-box-title">Administration</h1>
      <div className="admin-box-item">
        <TextField
          error={errorEmail}
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          variant="outlined"
          value={emailValue}
          onChange={(event) => {
            setAdminPageFields('emailValue', event.target.value);
          }}
        />
      </div>
      <div className="admin-box-item">
        <TextField
          error={errorPassword}
          id="outlined-password-input"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={passwordValue}
          onChange={(event) => {
            setAdminPageFields('passwordValue', event.target.value);
          }}
        />
      </div>
      <Button color="primary">
        <Link to="forgot-password">Mot de passe oublié</Link>
      </Button>
      <div className="admin-box-item admin-box-buttonContainer">
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Connexion
        </Button>
      </div>
    </form>
  </div>
);

Admin.propTypes = {
  emailValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  errorEmail: PropTypes.bool.isRequired,
  errorPassword: PropTypes.bool.isRequired,
  setAdminPageFields: PropTypes.func.isRequired,
  submitAdminConnectForm: PropTypes.func.isRequired,
};

export default Admin;

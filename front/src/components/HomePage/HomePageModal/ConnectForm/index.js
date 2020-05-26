import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import './connectForm.scss';

const ConnectForm = ({
  connectEmailValue,
  connectPasswordValue,
  setHomePageFields,
  submitConnectForm,
  connectErrorEmail,
  connectErrorPassword,
}) => (
  <form
    className="homePageModal-content-connect-connectform"
    onSubmit={(event) => {
      event.preventDefault();
      if (!connectErrorEmail
        && !connectErrorPassword
        && connectEmailValue.length > 0
        && connectPasswordValue.length > 0
      ) {
        submitConnectForm();
      }
      setHomePageFields('connectErrorPassword', false);
      setHomePageFields('connectErrorEmail', false);
      if (connectPasswordValue.length < 1) {
        setHomePageFields('connectErrorPassword', true);
      }
      if (connectEmailValue.length < 1) {
        setHomePageFields('connectErrorEmail', true);
      }
    }}
  >
    <DialogContent>
      <TextField
        error={connectErrorEmail}
        type="email"
        id="email"
        label="Email"
        variant="outlined"
        value={connectEmailValue}
        onChange={(event) => {
          setHomePageFields('connectErrorEmail', false);
          const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if (!mailRegEx.test(event.target.value)) {
            setHomePageFields('connectErrorEmail', true);
          }
          setHomePageFields('connectEmailValue', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <TextField
        error={connectErrorPassword}
        type="password"
        id="password"
        label="Mot de passe"
        variant="outlined"
        value={connectPasswordValue}
        onChange={(event) => {
          setHomePageFields('connectErrorPassword', false);
          if (event.target.value.length < 1) {
            setHomePageFields('connectErrorPassword', true);
          }
          setHomePageFields('connectPasswordValue', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        connexion
      </Button>
    </DialogContent>
  </form>
);

ConnectForm.propTypes = {
  connectEmailValue: PropTypes.string.isRequired,
  connectPasswordValue: PropTypes.string.isRequired,
  setHomePageFields: PropTypes.func.isRequired,
  submitConnectForm: PropTypes.func.isRequired,
  connectErrorEmail: PropTypes.bool.isRequired,
  connectErrorPassword: PropTypes.bool.isRequired,
};

export default ConnectForm;

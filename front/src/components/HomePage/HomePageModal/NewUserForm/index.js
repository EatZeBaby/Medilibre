import React from 'react';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import './newUserForm.scss';

const NewUserForm = ({
  newFirstname,
  firstnameError,
  newLastname,
  lastnameError,
  newEmail,
  emailError,
  newPhone,
  phoneError,
  newPassword,
  passwordError,
  newConfirmPassword,
  confirmPasswordError,
  setHomePageFields,
  submitNewUserForm,
}) => (
  <form
    className="homePageModal-content-connect-connectform"
    onSubmit={(event) => {
      event.preventDefault();
      let error = false;
      if (newLastname.length < 3) {
        setHomePageFields('lastnameError', true);
        error = true;
      }
      if (newFirstname.length < 3) {
        setHomePageFields('firstnameError', true);
        error = true;
      }
      const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!mailRegEx.test(newEmail)) {
        setHomePageFields('emailError', true);
        error = true;
      }
      const phoneRegEx = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
      if (!phoneRegEx.test(newPhone)) {
        setHomePageFields('phoneError', true);
        error = true;
      }
      if (newPassword.length < 5) {
        setHomePageFields('passwordError', true);
        error = true;
      }
      if (newConfirmPassword.length < 5
        || newPassword !== newConfirmPassword
      ) {
        error = true;
        setHomePageFields('confirmPasswordError', true);
      }
      if (!error) {
        submitNewUserForm();
      }
    }}
  >
    <DialogContent>
      <TextField
        error={lastnameError}
        id="lastname"
        type="text"
        label="Nom"
        variant="outlined"
        value={newLastname}
        onChange={(event) => {
          setHomePageFields('lastnameError', false);
          if (event.target.value.length < 3) {
            setHomePageFields('lastnameError', true);
          }
          setHomePageFields('newLastname', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <TextField
        error={firstnameError}
        id="firstname"
        type="text"
        label="Prénom"
        variant="outlined"
        value={newFirstname}
        onChange={(event) => {
          setHomePageFields('firstnameError', false);
          if (event.target.value.length < 3) {
            setHomePageFields('firstnameError', true);
          }
          setHomePageFields('newFirstname', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <TextField
        error={emailError}
        id="email"
        type="email"
        label="Adresse mail"
        variant="outlined"
        value={newEmail}
        onChange={(event) => {
          setHomePageFields('emailError', false);
          const mailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if (!mailRegEx.test(event.target.value)) {
            setHomePageFields('emailError', true);
          }
          setHomePageFields('newEmail', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <TextField
        error={phoneError}
        id="phone"
        type="Phone"
        label="N° de téléphone"
        variant="outlined"
        value={newPhone}
        onChange={(event) => {
          setHomePageFields('phoneError', false);
          const phoneRegEx = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;
          if (!phoneRegEx.test(event.target.value)) {
            setHomePageFields('phoneError', true);
          }
          setHomePageFields('newPhone', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <TextField
        error={passwordError}
        id="pasword"
        type="password"
        label="Mot de passe"
        variant="outlined"
        value={newPassword}
        onChange={(event) => {
          setHomePageFields('passwordError', false);
          if (event.target.value.length < 5) {
            setHomePageFields('passwordError', true);
          }
          setHomePageFields('newPassword', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <TextField
        error={confirmPasswordError}
        id="confirmPasword"
        type="password"
        label="Confirmer le mot de passe"
        variant="outlined"
        value={newConfirmPassword}
        onChange={(event) => {
          setHomePageFields('confirmPasswordError', false);
          if (event.target.value.length < 5
            || event.target.value !== newPassword
          ) {
            setHomePageFields('confirmPasswordError', true);
          }
          setHomePageFields('newConfirmPassword', event.target.value);
        }}
      />
    </DialogContent>
    <DialogContent>
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Creer un compte
      </Button>
    </DialogContent>
  </form>
);

NewUserForm.propTypes = {
  newFirstname: PropTypes.string.isRequired,
  newLastname: PropTypes.string.isRequired,
  newEmail: PropTypes.string.isRequired,
  newPhone: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  newConfirmPassword: PropTypes.string.isRequired,
  setHomePageFields: PropTypes.func.isRequired,
  submitNewUserForm: PropTypes.func.isRequired,
  firstnameError: PropTypes.bool.isRequired,
  lastnameError: PropTypes.bool.isRequired,
  emailError: PropTypes.bool.isRequired,
  phoneError: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired,
  confirmPasswordError: PropTypes.bool.isRequired,
};

export default NewUserForm;

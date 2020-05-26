// == Import npm
import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

// == Import
import Connect from 'src/containers/Connect';
import Suscribe from 'src/containers/Suscribe';
import Appointments from 'src/containers/Appointments';
import Profile from 'src/containers/Profile';
import Header from 'src/containers/Header';
import PageRouter from 'src/components/PageRouter';
import SearchPage from 'src/containers/SearchPage';
import Renew from 'src/containers/Renew';
import RenewPassword from 'src/containers/RenewPassword';

import { useSnackbar } from 'notistack';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// == Composant
const App = ({
  getParameters,
  checkSession,
  loading,
  isLogged,
  openConnect,
  setOpenConnect,
  openSuscribe,
  setOpenSuscribe,
  openHistoric,
  setOpenHistoric,
  openProfile,
  setOpenProfile,
  flashMessage,
  page404,
  openRenew,
  setOpenRenew,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    checkSession();
  }, []);
  useEffect(() => {
    if (flashMessage.length > 1) {
      enqueueSnackbar(flashMessage[0], { variant: flashMessage[1] });
    }
  }, [flashMessage]);

  return (
    <div className="app">
      <Header />
      {/**
       * Modal de connection
       */}
      <Dialog
        fullScreen
        open={openConnect}
        onClose={() => {
          setOpenConnect(false);
        }}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <Connect />
      </Dialog>

      {/**
       * Modal d'inscription
       */}
      <Dialog
        fullScreen
        open={openSuscribe}
        onClose={() => {
          setOpenSuscribe(false);
        }}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <Suscribe />
      </Dialog>

      {/**
       * Modal de la liste des rendez-vvous
       */}
      {isLogged && (
        <Dialog
          fullScreen
          open={openHistoric}
          onClose={() => {
            setOpenHistoric(false);
          }}
          aria-labelledby="max-width-dialog-title"
          TransitionComponent={Transition}
        >
          <Appointments />
        </Dialog>
      )}

      {/**
       * Modal de page profil
       */}
      {isLogged && (
        <Dialog
          fullScreen
          open={openProfile}
          onClose={() => {
            setOpenProfile(false);
          }}
          aria-labelledby="max-width-dialog-title"
          TransitionComponent={Transition}
        >
          <Profile />
        </Dialog>
      )}

      {/**
       * Modal de connection
       */}
      <Dialog
        fullScreen
        open={openRenew}
        onClose={() => {
          setOpenRenew(false);
        }}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <Renew />
      </Dialog>
      <Switch>
        <Route path="/" exact>
          <SearchPage />
        </Route>
        <Route path="/renew/:token">
          <RenewPassword />
        </Route>
        <Route path="/:doctorSlug" exact>
          <PageRouter
            loading={loading}
            getParameters={getParameters}
            page404={page404}
          />
        </Route>
      </Switch>

    </div>
  );
};

App.propTypes = {
  getParameters: PropTypes.func.isRequired,
  checkSession: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
  openConnect: PropTypes.bool.isRequired,
  setOpenConnect: PropTypes.func.isRequired,
  openSuscribe: PropTypes.bool.isRequired,
  setOpenSuscribe: PropTypes.func.isRequired,
  openHistoric: PropTypes.bool.isRequired,
  setOpenHistoric: PropTypes.func.isRequired,
  openProfile: PropTypes.bool.isRequired,
  setOpenProfile: PropTypes.func.isRequired,
  flashMessage: PropTypes.array.isRequired,
  page404: PropTypes.bool.isRequired,
  openRenew: PropTypes.bool.isRequired,
  setOpenRenew: PropTypes.func.isRequired,
};

// == Export
export default App;

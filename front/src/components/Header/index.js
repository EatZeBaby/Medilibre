import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import './header.scss';


const Header = ({
  isLogged,
  logoutUser,
  setOpenConnect,
  setOpenAppointment,
  setOpenSuscribe,
  setOpenHistoric,
  setOpenProfile,
  doctorFirstname,
  doctorLastname,
  doctorJob,
}) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'spaceBetween',
    },
  }));

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#242a65',
        }}
      >
        <Toolbar
          className={classes.toolbar}
          display="flex"
          style={{ justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#242a65' }}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            {location.pathname === '/' && (
              <Typography variant="h6" className={classes.title}>
                MediLibre
              </Typography>
            )}
            {location.pathname !== '/' && (
              <Typography variant="h6" className={classes.title}>
                {doctorFirstname} {doctorLastname} {doctorJob}
              </Typography>
            )}
          </div>
          <div className="header-connect">
            <Button color="inherit">
              {!isLogged && (
                <div
                  onClick={() => {
                    setOpenConnect(true);
                  }}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PermIdentityOutlinedIcon />
                </div>
              )}
              {isLogged && (
                <div
                  onClick={logoutUser}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ExitToAppOutlinedIcon />
                </div>
              )}
            </Button>

          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {doctorLastname !== '' && location.pathname !== '/' && (
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenAppointment(true);
            }}
          >
            Prendre rendez-vous
          </MenuItem>
        )}
        {!isLogged && (
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenConnect(true);
            }}
          >
            Se connecter
          </MenuItem>
        )}
        {!isLogged && (
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenSuscribe(true);
            }}
          >
            Créer un compte
          </MenuItem>
        )}
        {isLogged && (
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenHistoric(true);
            }}
          >
            Mes rendez-vous
          </MenuItem>
        )}
        {isLogged && (
          <MenuItem
            onClick={() => {
              handleClose();
              setOpenProfile(true);
            }}
          >
            Mon profil
          </MenuItem>
        )}
        {isLogged && (
          <MenuItem onClick={handleClose}><div onClick={logoutUser}>Se deconnecter</div></MenuItem>
        )}
      </Menu>
    </div>
  );
};

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setOpenConnect: PropTypes.func.isRequired,
  setOpenAppointment: PropTypes.func.isRequired,
  setOpenSuscribe: PropTypes.func.isRequired,
  setOpenHistoric: PropTypes.func.isRequired,
  setOpenProfile: PropTypes.func.isRequired,
  doctorFirstname: PropTypes.string,
  doctorLastname: PropTypes.string,
  doctorJob: PropTypes.string,
};

Header.defaultProps = {
  doctorFirstname: 'MediLibre',
  doctorLastname: '',
  doctorJob: '',
};

export default Header;

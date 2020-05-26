import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import DevicesOutlinedIcon from '@material-ui/icons/DevicesOutlined';

import { CURRENT_SERVEUR_URL } from 'src/config';


import './adminHeader.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const AdminHeader = ({
  logoutDoctor,
  doctorDatas,
  SwitchOnlineAppointments,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Gestion du cabinet
          </Typography>
          <Button color="inherit" onClick={logoutDoctor}>Deconnexion</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div
          role="presentation"
        >
          <Link to="/planning">
            <h3 className="adminHeader-title">MediLibre</h3>
          </Link>
          <Link
            to="/cabinet"
            style={{
              padding: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Avatar
              style={{ marginBottom: '1rem', width: '70px', height: '70px' }}
              src={`${CURRENT_SERVEUR_URL.substr(0, -6)}${doctorDatas.avatar}`}
            />
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '.5rem',
              }}
            >
              {doctorDatas.firstname} {doctorDatas.lastname}
            </div>
            <div>
              {doctorDatas.job}
            </div>
          </Link>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <DevicesOutlinedIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Rdv en ligne" />
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                edge="end"
                onChange={(event) => {
                  SwitchOnlineAppointments(event.target.checked);
                }}
                checked={doctorDatas.onlineAppointment}
                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <List
            onClick={() => {
              setOpen(false);
            }}
            onKeyDown={() => {
              setOpen(false);
            }}
          >
            <Link to="/planning">
              <ListItem
                button
              >
                <ListItemIcon>
                  <DateRangeOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  Planning
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/patients">
              <ListItem
                button
              >
                <ListItemIcon>
                  <PeopleAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  Patients
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/cabinet">
              <ListItem
                button
              >
                <ListItemIcon>
                  <StorefrontOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  Paramètres du cabinet
                </ListItemText>
              </ListItem>
            </Link>
            <Link to="/parametres">
              <ListItem
                button
              >
                <ListItemIcon>
                  <BuildOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  Paramètres de l'application
                </ListItemText>
              </ListItem>
            </Link>
          </List>
          <Divider />
          {doctorDatas.superAdmin && (
            <List>
              <Link to="/addDoctor">
                <ListItem
                  button
                >
                  <ListItemIcon>
                    <AddCircleOutlineIcon />
                  </ListItemIcon>
                  <ListItemText>
                    Creer de nouveau utilisateurs
                  </ListItemText>
                </ListItem>
              </Link>
              <Link to="/parametres">
                <ListItem
                  button
                >
                  <ListItemIcon>
                    <SupervisedUserCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    Gestion des utilisateurs
                  </ListItemText>
                </ListItem>
              </Link>
            </List>
          )}
          <Divider />
          <List>
            <Link
              to="/"
              onClick={logoutDoctor}
            >
              <ListItem
                button
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>
                  Deconnexion
                </ListItemText>
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>

    </div>
  );
};

AdminHeader.propTypes = {
  logoutDoctor: PropTypes.func.isRequired,
  doctorDatas: PropTypes.object.isRequired,
  SwitchOnlineAppointments: PropTypes.func.isRequired,
};

export default AdminHeader;

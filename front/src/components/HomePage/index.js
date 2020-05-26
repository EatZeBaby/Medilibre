import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import OpenMap from 'src/components/OpenMap';
import Avatar from '@material-ui/core/Avatar';

import { dateToString } from 'src/utils/dateFunctions';
import SERVEUR_URL from 'src/config';

import HomePageModal from 'src/containers/HomePage/HomePageModal';

import './homePage.scss';
import hero from './hero.jpg';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


const getSteps = () => ['Selectionner', 'S\'identifier', 'Confirmer'];

const getStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return '';
    case 1:
      return '';
    case 2:
      return '';
    default:
      return 'Unknown stepIndex';
  }
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const HomePage = ({
  doctorFirstname,
  doctorLastname,
  doctorCivility,
  doctorJob,
  doctorAdress,
  doctorZip,
  doctorCity,
  doctorPhone,
  doctorPublicEmail,
  getFuturAppointments,
  setShowedDays,
  isLogged,
  selectAppointment,
  selectCurrentAppointment,
  setHomePageModalShow,
  openAppointment,
  setOpenAppointment,
  doctorPresentation,
  oppeningDays,
  oppeningHours,
  avatar,
  selectedDay,
  onlineAppointment,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const classes = useStyles();

  useEffect(() => {
    document.title = `MediLibre | ${doctorFirstname} ${doctorLastname} | ${doctorJob}`;
    document.getElementsByTagName('meta').description.content = doctorPresentation.substr(0, 230);
    Axios({
      method: 'get',
      url: 'https://nominatim.openstreetmap.org/search',
      responseType: 'json',
      params: {
        format: 'json',
        limit: 3,
        street: doctorAdress,
        city: doctorCity,
        postalcode: doctorZip,
      },
    }).then((response) => {
      setLat(Number(response.data[0].lat));
      setLng(Number(response.data[0].lon));
    }).catch(() => {
      Axios({
        method: 'get',
        url: 'https://nominatim.openstreetmap.org/search',
        responseType: 'json',
        params: {
          format: 'json',
          limit: 3,
          city: doctorCity,
          postalcode: doctorZip,
        },
      }).then((response) => {
        setLat(Number(response.data[0].lat));
        setLng(Number(response.data[0].lon));
      }).catch(() => {
      });
    });


    setInterval(getFuturAppointments, 10000);
    const now = Date.parse(new Date());
    const tomorow = now + (3600000 * 24);
    const tomorow2 = tomorow + (3600000 * 24);
    const tomorow3 = tomorow2 + (3600000 * 24);
    const showedDay = [
      dateToString(now),
      dateToString(tomorow),
      dateToString(tomorow2),
      dateToString(tomorow3),
    ];
    setShowedDays(showedDay);
  }, [doctorAdress]);

  const steps = getSteps();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (!isLogged && activeStep >= 1) {
      return 0;
    }
    if (isLogged && activeStep === 2) {
      selectAppointment();
      selectCurrentAppointment('');
      setHomePageModalShow(false);
    }

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    return 1;
  };

  return (
    <div className="homePage">
      <div style={{ backgroundImage: `url(${hero})` }} className="homePage-header">
        <div className="homepage-dark">
          <Avatar
            style={{ margin: 'auto', width: '100px', height: '100px' }}
            src={`${SERVEUR_URL.substr(0, -6)}${avatar}`}
          />
          <h1 className="homePage-header-title">{doctorCivility} {doctorLastname} {doctorFirstname}</h1>
          <h2 className="homePage-header-subtitle">{doctorJob}</h2>
        </div>
      </div>
      <div
        className="homePage-callToAction"
        onClick={() => {
          setOpenAppointment(true);
        }}
      >
        <h3 className="homePage-callToAction-title">Prendre rendez-vous en ligne</h3>
      </div>
      <div className="homePage-content">
        <div className="homePage-content-cabinet">
          <div className="homePage-content-cabinet-presentation">
            {doctorPresentation}
          </div>
          <OpenMap
            lat={lat}
            lng={lng}
          />
          <div className="homePage-content-cabinet-box">
            <div>
              <h3 className="homePage-content-cabinet-box-title">
                Adresse
              </h3>
              <div className="homePage-content-cabinet-box-important">
                {doctorFirstname} {doctorLastname}
              </div>
              <div>
                {doctorJob}
              </div>
              <div>
                {doctorAdress}
              </div>
              <div>
                <span>{doctorZip} {doctorCity}</span>
              </div>
            </div>
            <div>
              <h3 className="homePage-content-cabinet-box-title">
                Contact
              </h3>
              <div className="homePage-content-cabinet-box-important">
                {doctorPhone}
              </div>
              <a href={`mailto:${doctorPublicEmail}`} className="homePage-content-cabinet-box-email">
                {doctorPublicEmail}
              </a>
            </div>
          </div>
          <div className="homePage-content-cabinet-schedule">
            <div>
              <h4 className="homePage-content-cabinet-schedule-title">
                Horaires
              </h4>
              <div className="homePage-content-cabinet-schedule-day">
                Lundi:
              </div>
              {((oppeningDays[1] !== '1') && (oppeningDays[1] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[1] === '1') || (oppeningDays[1] === 1)) && oppeningHours[1].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
            <div>
              <div className="homePage-content-cabinet-schedule-day">
                Mardi:
              </div>
              {((oppeningDays[2] !== '1') && (oppeningDays[2] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[2] === '1') || (oppeningDays[2] === 1)) && oppeningHours[2].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
            <div>
              <div className="homePage-content-cabinet-schedule-day">
                Mercredi:
              </div>
              {((oppeningDays[3] !== '1') && (oppeningDays[3] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[3] === '1') || (oppeningDays[3] === 1)) && oppeningHours[3].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
            <div>
              <div className="homePage-content-cabinet-schedule-day">
                Jeudi:
              </div>
              {((oppeningDays[4] !== '1') && (oppeningDays[4] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[4] === '1') || (oppeningDays[4] === 1)) && oppeningHours[4].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
            <div>
              <div className="homePage-content-cabinet-schedule-day">
                Vendredi:
              </div>
              {((oppeningDays[5] !== '1') && (oppeningDays[5] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[5] === '1') || (oppeningDays[5] === 1)) && oppeningHours[5].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
            <div>
              <div className="homePage-content-cabinet-schedule-day">
                Samedi:
              </div>
              {((oppeningDays[6] !== '1') && (oppeningDays[6] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[6] === '1') || (oppeningDays[6] === 1)) && oppeningHours[6].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
            <div>
              <div className="homePage-content-cabinet-schedule-day">
                Dimanche:
              </div>
              {((oppeningDays[0] !== '1') && (oppeningDays[0] !== 1)) && (
                <span> Fermé</span>
              )}
              {((oppeningDays[0] === '1') || (oppeningDays[0] === 1)) && oppeningHours[0].map((stage) => (
                <span key={stage[0]}> {stage[0]}-{stage[1]} </span>
              ))}
            </div>
          </div>
          <footer className="homePage-footer">
            Créé par Martin Brunel sous licence MIT &copy; 2020
          </footer>
        </div>
      </div>

      {/**
      * modale de prise de rendez-vous
      */}
      <Dialog
        fullScreen
        open={openAppointment}
        onClose={() => {
          setActiveStep(0);
          setOpenAppointment(false);
        }}
        aria-labelledby="max-width-dialog-title"
        TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
          style={{
            backgroundColor: '#242a65',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setActiveStep(0);
                setOpenAppointment(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Selection du rendez-vous
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="homePage-modal-content">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <HomePageModal activeStep={activeStep} />
          {activeStep === steps.length && (
            <DialogContent dividers>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContentText>
                Merci
              </DialogContentText>
              <DialogContentText className={classes.instructions}>
                Votre rendez-vous est bien enregistré.
              </DialogContentText>
            </DialogContent>
          )}
          {selectedDay !== '' && onlineAppointment && (
            <div className="homePage-modal-content-buttonContainer">
              {activeStep < steps.length && (
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Retour
                    </Button>
                    {((activeStep < 1) || (activeStep >= 1 && isLogged)) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Confirmer' : 'Valider'}
                      </Button>
                    ) }
                  </div>
                </div>
              )}
              {activeStep === steps.length && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setActiveStep(0);
                    setOpenAppointment(false);
                  }}
                  className={classes.button}
                >
                  Retour
                </Button>
              )}
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

HomePage.propTypes = {
  doctorFirstname: PropTypes.string.isRequired,
  doctorLastname: PropTypes.string.isRequired,
  doctorCivility: PropTypes.string.isRequired,
  doctorJob: PropTypes.string.isRequired,
  getFuturAppointments: PropTypes.func.isRequired,
  setShowedDays: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  selectAppointment: PropTypes.func.isRequired,
  selectCurrentAppointment: PropTypes.func.isRequired,
  setHomePageModalShow: PropTypes.func.isRequired,
  openAppointment: PropTypes.bool.isRequired,
  setOpenAppointment: PropTypes.func.isRequired,
  doctorPresentation: PropTypes.string.isRequired,
  doctorAdress: PropTypes.string.isRequired,
  doctorZip: PropTypes.string.isRequired,
  doctorCity: PropTypes.string.isRequired,
  doctorPhone: PropTypes.string.isRequired,
  doctorPublicEmail: PropTypes.string.isRequired,
  oppeningDays: PropTypes.array.isRequired,
  oppeningHours: PropTypes.array.isRequired,
  avatar: PropTypes.string,
  selectedDay: PropTypes.string.isRequired,
  onlineAppointment: PropTypes.bool,
};

HomePage.defaultProps = {
  avatar: undefined,
  onlineAppointment: false,
};


export default HomePage;

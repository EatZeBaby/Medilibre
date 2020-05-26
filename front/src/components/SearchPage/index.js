import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import SERVEUR_URL from 'src/config';
import './searchPage.scss';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    display: 'flex',
    justifyContent: 'space-between',
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const SearchPage = ({
  doctors,
  loadDoctorsList,
}) => {
  const classes = useStyles();
  useEffect(() => {
    loadDoctorsList();
  }, []);

  return (
    <div className="searchPage">
      <div className="searchPage-header">
        <div className="searchPage-content">
          <h1 className="searchPage-header-title">
            Prenez rendez-vous avec votre professionnel de santé
          </h1>
          <div className="searchPage-header-searchbar">
            <SearchOutlinedIcon id="loupeIcon" />
            <Autocomplete
              id="country-select-demo"
              style={{
                minWidth: 300,
                width: '70%',
                padding: '.3rem',
              }}
              options={doctors}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              // eslint-disable-next-line no-underscore-dangle
              getOptionLabel={(option) => `${option.firstname} ${option.lastname} ${option.job} ${option.city} ${option.zip}`}
              renderOption={(option) => (
                <Link
                  to={`/${option.slug}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Avatar
                    style={{
                      marginRight: '1rem',
                    }}
                    src={`${SERVEUR_URL.substr(0, -6)}${option.avatar}`}
                  />
                  <div>
                    <div>
                      {option.firstname} {option.lastname.toUpperCase()}
                    </div>
                    <div>
                      {option.job}
                    </div>
                  </div>
                </Link>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="trouver un professionnel"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'off', // disable autocomplete and autofill
                    form: {
                      autocomplete: false,
                    },
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>


    </div>
  );
};

SearchPage.propTypes = {
  doctors: PropTypes.array.isRequired,
  loadDoctorsList: PropTypes.func.isRequired,
  saveParameters: PropTypes.func.isRequired,
};

export default SearchPage;

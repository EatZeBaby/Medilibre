import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


import HomePage from 'src/containers/HomePage';

const PageRouter = ({
  loading,
  getParameters,
  page404,
}) => {
  const { doctorSlug } = useParams();
  useEffect(() => {
    getParameters(doctorSlug);
  }, []);

  return (
    <div>
      {!loading && <HomePage />}
      {page404 && (
        <div>
          Page 404
        </div>
      )}
    </div>
  );
};

PageRouter.propTypes = {
  loading: PropTypes.bool.isRequired,
  getParameters: PropTypes.func.isRequired,
  page404: PropTypes.bool.isRequired,
};

export default PageRouter;

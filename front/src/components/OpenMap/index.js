import React from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  TileLayer, Marker,
} from 'react-leaflet';


import './openMap.scss';

const OpenMap = ({
  lat,
  lng,
}) => {
  const position = [lat, lng];

  return (
    <Map center={position} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </Map>
  );
};

OpenMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default OpenMap;

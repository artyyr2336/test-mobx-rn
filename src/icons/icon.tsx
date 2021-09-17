//@ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import Svg from 'react-native-svg';
import {iconList} from './iconList';

export const Icon = ({size = 18, color = '#000', name, ...props}) => {
  if (!iconList[name]) {
    return null;
  }

  const {viewBox, data} = iconList[name];

  return (
    <Svg
      viewBox={viewBox || '0 0 512 512'}
      height={size}
      width={size}
      {...props}>
      {data(color)}
    </Svg>
  );
};
Icon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string,
};

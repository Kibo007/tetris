import React from 'react';
import { Dimensions } from '../../../data/constants/index';

const Square = ({ color })  => {
  let style = {
    backgroundColor: color,
    width: Dimensions.Square,
    height: Dimensions.Square
  };

  return (
    <div style={style}/>
  );
};

export default Square;
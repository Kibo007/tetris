import React from 'react';
import Square from './Square.js';
import Row from './Row.js';
import { Dimensions } from '../../../data/constants/index';

const Tetromino = ({ shape, color, placement }) => {
  const rows = shape.map((row, i) =>
    <Row key={i}>
      {row.map((cell, j) =>
        <Square color={cell && color || null}
                key={`${i}${j}`}/>)
      }
    </Row>
  );

  const style = {
    position: placement ? 'absolute' : 'static',
    margin: placement ? '0' : 'margin-top: 30px',
    top: placement && placement.top * Dimensions.Square,
    left: placement && placement.left * Dimensions.Square
  };

  return (
    <div style={style}>
      {rows}
    </div>
  );
};

Tetromino.defaultProps = {
  shape: [[]],
  placement: null
};

export default Tetromino;

import React from 'react';
import Square from '../Tetrominos/Square.js';
import { Dimensions as D, Colors as C } from '../../../data/constants/index';
import { Block } from 'jsxstyle';

const Field = ({ children, matrix }) => {
  const squares = [];
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) {
        return;
      }
      squares.push(
        <div
          key={`${i}${j}`}
          style={{
                        position: 'absolute',
                        top: i * D.Square,
                        left: j * D.Square
                    }}
        >
          <Square color={cell}/>
        </div>
      );
    });
  });

  const style = {
    width: D.Square * D.Field.width,
    height: D.Square * D.Field.height,
    backgroundColor: C.Field.backgroundColor,
    position: 'relative'
  };

  return (
    <div style={style}
    >
      {squares}
      {children}
    </div>
  );
};

export default Field;

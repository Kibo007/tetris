import React from 'react';
import { Colors, Dimensions } from '../../../data/constants/index';
import Tetromino from '../Tetrominos/Tetromino.js';
import { Flex } from 'jsxstyle';
import PanelItem from '../PanelItem/PanelItem.js';

const NextTetromino = ({ tetromino }) => {
  return (
    <PanelItem title="next">
      <Flex
        justifyContent="center"
        padding="5px 0 32px 0"
        width={Dimensions.NextTetromino.width * Dimensions.Square}
        height={Dimensions.NextTetromino.height * Dimensions.Square}
      >
        <Tetromino shape={tetromino.shape}
                   color={tetromino.color}
        />
      </Flex>
    </PanelItem>
  );
};

export default NextTetromino;

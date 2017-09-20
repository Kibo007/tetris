import React from 'react';
import { Flex, Block } from 'jsxstyle';

const Modal = ({ message, show }) => {
  return (
    <Flex
      opacity={show ? 1 : 0}
      transition="all 1s"
      height="60"
      width="100%"
      position="absolute"
      top="120px"
      color="white"
      alignItems="center"
      justifyContent="center"
      fontFamily="Lato-Regular"
      fontWeight="300"
      textTransform="uppercase"
    >
      <Block textAlign="center">
        {message}
      </Block>
    </Flex>
  );
};

export default Modal;

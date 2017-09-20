import React from 'react';
import { Block } from 'jsxstyle';
import PanelItem from '../PanelItem/PanelItem.js';

import styles from './button.scss'

const Button = ({ title, onClick }) => {
  return (
    <Block fontFamily="Lato-Regular"
           padding="7px 5px 0 15px"
           color="#ffffff"
           fontWeight="300"
    >
      <button onClick={onClick} className={styles.button}>
        {title}
      </button>
    </Block>
  );
};

export default Button;

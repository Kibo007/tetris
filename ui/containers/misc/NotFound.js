import React, { Component } from 'react';
import styles from './misc.scss';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.viewContainer}>
        <div>
          <h1>404!</h1>
          <p>Oops, no such page exists.</p>
        </div>
      </div>
    );
  }
}

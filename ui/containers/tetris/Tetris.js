import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Field from './../../components/Field/Field.js';
import Tetromino from './../../components/Tetrominos/Tetromino.js';
import NextTetromino from './../../components/NextTetromino/NextTetromino.js';
import Level from './../../components/Level/Level.js';
import DeletedRows from './../../components/DeletedRows/DeletedRows.js';
import Modal from './../../components/Modal/Modal.js';
import Button from './../../components/Button/Button.js';
import { KeyCodes } from './../../../data/constants/index';
import { Col } from 'jsxstyle';

import {mapStateToProps, mapActionToDispatch} from '../../../data/modules/tetris';

import styles from './tetris.scss';

class Tetris extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '"s" to start',
      hasFocus: false
    };
  }

  handleOnFocus = event => {
    this.setState({ hasFocus: true });
  };

  handleOnClickOutside = event => {
    if (findDOMNode(this).contains(event.target)) return;
    this.setState({ hasFocus: false });
  };

  componentDidMount() {
    window.addEventListener('click', this.handleOnClickOutside, false);
    this.refs.main.focus();
  };

  componentDidUpdate(prevProps, prevState) {
    const { game, dispatch } = this.props;
    if (game.newTetromino && !prevProps.game.newTetromino) {
      this.props.newTetromino();
    }

    if (game.lose && !prevProps.game.lose)
      this.setState({ message: 'you lose' });
  };

  handleKeyDown = event => {
    const { rotate, moveLeft, moveRight, moveDown, startGame } = this.props;

    event.preventDefault();

    switch (event.keyCode) {
      case KeyCodes.SPACE_BAR:
      case KeyCodes.UP_ARROW:
        return rotate();
      case KeyCodes.LEFT_ARROW:
        return moveLeft();
      case KeyCodes.RIGHT_ARROW:
        return moveRight();
      case KeyCodes.DOWN_ARROW:
        return moveDown();
      case KeyCodes.S:
        return startGame();
    }
  };

  render() {
    const { game, pauseGame, unpauseGame, restartGame, quitGame } = this.props;
    const currentTetromino = <Tetromino {...game.currentTetromino} />;
    const showMessage = !game.intervalId;

    return (
      <div
        data-layout="column" data-layout-align="start center"
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleOnFocus}
        tabIndex="1"
        ref="main"
        style={{
          display: 'flex',
          outline: 'unset',
          opacity: this.state.hasFocus ? 1 : .6
        }}
      >
        <h1 className={styles.title}>Tetris Game</h1>
        <div data-layout="row" data-layout-align="start center">
          <Col opacity={game.lose ? .6 : 1}>
            <Field matrix={game.field.matrix}>
              {currentTetromino}
              <Modal message={this.state.message} show={showMessage} />
            </Field>
          </Col>
          <Col>
            <NextTetromino tetromino={game.nextTetromino}/>
            <Level level={game.level} />
            <DeletedRows rows={game.rows} />
            <Button title="restart" onClick={restartGame}/>
            <Button title={game.isPaused ? 'unpause' : 'pause'}
                    onClick={game.isPaused ? unpauseGame : pauseGame}/>
            <Button title="quit" onClick={quitGame}/>
          </Col>
        </div>

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapActionToDispatch
)(Tetris);


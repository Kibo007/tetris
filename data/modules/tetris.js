'use strict';

import {bindActionCreators} from 'redux';
import { Shapes, Dimensions, Colors } from '../constants/index';
import { first, shuffle, zip, drop, includes as _includes } from 'lodash';
import { clone, times } from 'lodash';

//---------------------------------------------------------------------------------------------
//---------------------------- action type  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

const ROTATE = 'ROTATE';
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const START_GAME = 'START_GAME';
const PAUSE_GAME = 'PAUSE_GAME';
const QUIT_GAME = 'QUIT_GAME';
const RESTART_GAME = 'RESTART_GAME';
const MOVE_DOWN = 'MOVE_DOWN';
const GAME_STARTED = 'GAME_STARTED';
const NEW_TETROMINO = 'NEW_TETROMINO';

//---------------------------------------------------------------------------------------------
//---------------------------- action creator  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const rotate = () => {
  return {
    type: ROTATE
  };
};

export const moveLeft = () => {
  return {
    type: MOVE_LEFT
  };
};

export const moveRight = () => {
  return {
    type: MOVE_RIGHT
  };
};

export const moveDown = () => {
  return {
    type: MOVE_DOWN
  };
};

export const newTetromino = () => {
  return (dispatch, getState) => {
    const intervalId = setInterval(() => {
      dispatch(moveDown());
    }, 1000 / (getState().game.level + 1));
    dispatch({type: NEW_TETROMINO, payload: {intervalId}});
  };
};

export const startGame = () => {
  return (dispatch, getState) => {
    console.log('> Game starting...');
    const intervalId = setInterval(() => {
      dispatch(moveDown());
    }, 1000);
    dispatch({type: START_GAME, payload: {intervalId}});
  };
};

export const pauseGame = () => {
  return {
    type: PAUSE_GAME
  };
};

export const quitGame = () => {
  return {
    type: QUIT_GAME
  };
};

export const unpauseGame = () => {
  return (dispatch, getState) => {
    console.log('> Game unpaused...');
    const intervalId = setInterval(() => {
      dispatch(moveDown());
    }, 1000);
    dispatch({type: START_GAME, payload: {intervalId}});
  };
};

export const restartGame = () => {
  return (dispatch, getState) => {
    console.log('> Game restarting...');
    const intervalId = setInterval(() => {
      dispatch(moveDown());
    }, 1000);
    dispatch({type: RESTART_GAME, payload: {intervalId}});
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- helper functions  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

/**
 * Revers matrix array to rotate tetromino
 * @returns {Array}
 */
export const rotateLodash = (matrix) => {
  return zip.apply(null, matrix).map(row => row.reverse());
};

/**
 * Crete tetromino collection from Shapes and Colors const
 * @returns {Array}
 */
export const getPermutation = () => {
  const tetrominos = shuffle(Object.keys(Shapes)).map(key => Shapes[key]);
  const colors = shuffle(Colors.Tetrominos);
  return zip(tetrominos, colors).map(tuple => ({
    shape: tuple[0],
    color: tuple[1],
    placement: {top: 0, left: 4}
  }));
};

/**
 * Crete initial state of game
 * @returns {Object}
 */
export const getInitialState = () => {
  const permutation = getPermutation();
  const currentTetromino = permutation.shift();
  return {
    currentTetromino,
    permutation,
    nextTetromino: first(permutation),
    field: {
      matrix: times(
        Dimensions.Field.height,
        () => times(Dimensions.Field.width, () => null)
      ),
      cellAt: function (top, left) {
        if (this.matrix[top] !== undefined) {
          return this.matrix[top][left];
        }
        return undefined;
      }
    },
    intervalId: null,
    rows: 0,
    level: 0,
    newTetromino: false,
    lose: false
  };
};

/**
 * Calculate tetromino position on board from offest and tetromino
 * @param t<Array> - tetromino shape
 * @param offset<Object> - tetromino offset on board
 * @returns {Array}
 */
export const getTetrominoCells = (t, offset) => {
  const cells = [];
  t.forEach((row, i) => {
    row.forEach((col, j) =>
      col === 1 && cells.push({top: i + offset.top, left: j + offset.left})
    );
  });
  return cells;
};

/**
 * Calculate tetromino position on board based on current sate of game
 * @param state<Object> - state of game
 * @returns {Array}
 */
export const getCurrentTetrominoCells = (state) => {
  const t = state.currentTetromino.shape;
  const offset = state.currentTetromino.placement;
  return getTetrominoCells(t, offset);
};

/**
 * Object with methods to calculate if tetromino can go
 * down, left, right or rotate based on current tetromino on board
 */
export const Can = {
  moveLeft: (state, cells) =>
    cells.every(cell => state.field.cellAt(cell.top, cell.left - 1) === null),
  moveRight: (state, cells) =>
    cells.every(cell => state.field.cellAt(cell.top, cell.left + 1) === null),
  moveDown: (state, cells) =>
    cells.every(cell => state.field.cellAt(cell.top + 1, cell.left) === null),
  rotate: (state, cells) =>
    cells.every(cell => state.field.cellAt(cell.top, cell.left) === null)
};

/**
 * Return new state of game with added tetromino to matrix
 * board in way to replace null with nextTetromino color
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const addTetrominoToField = (state) => {
  const newState = clone(state);
  const cells = getCurrentTetrominoCells(newState);
  cells.forEach(cell => {
    newState.field.matrix[cell.top][cell.left] = newState.currentTetromino.color;
  });
  return newState;
};

/**
 * Return new state of game with calculated level of game and
 * rows removed
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const updateScore = (state) => {
  const newState = clone(state);
  const matrix =
          newState.field.matrix.filter(row => row.some(cell => cell === null));
  newState.field.matrix = matrix;
  const nOfDeletedRows = Dimensions.Field.height - matrix.length;
  newState.rows += nOfDeletedRows;
  newState.level = Math.floor(newState.rows / 10);
  Array.prototype.unshift.apply(
    matrix,
    times(nOfDeletedRows, () => times(Dimensions.Field.width, () => null))
  );
  return newState;
};

//---------------------------------------------------------------------------------------------
//---------------------------- reducer  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

/**
 * changed shape in state rotating if possible
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const rotateReducer = (state) => {
  const newState = {...state};
  const rotatedTetromino = rotateLodash(newState.currentTetromino.shape);
  const offset = newState.currentTetromino.placement;
  if (Can.rotate(newState, getTetrominoCells(rotatedTetromino, offset))) {
    newState.currentTetromino.shape = rotatedTetromino;
  }
  return newState;
};

/**
 * change placement in of current tetromino if possible one position to left
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const moveLeftReducer = (state) => {
  const newState = {...state};
  if (Can.moveLeft(state, getCurrentTetrominoCells(state))) {
    newState.currentTetromino.placement = {
      top: state.currentTetromino.placement.top,
      left: state.currentTetromino.placement.left - 1
    };
  }
  return newState;
};

/**
 * change placement of current tetromino if possible for one position to right
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const moveRightReducer = (state) => {
  const newState = clone(state);
  if (Can.moveRight(state, getCurrentTetrominoCells(state))) {
    newState.currentTetromino.placement = {
      top: state.currentTetromino.placement.top,
      left: state.currentTetromino.placement.left + 1
    };
  }
  return newState;
};

/**
 * change placement of current tetromino if possible for one position down
 * @param state<Object> - state of game
 * @returns {Object}
 */
const moveDownReducer = (state) => {
  let newState = clone(state);
  if (Can.moveDown(state, getCurrentTetrominoCells(state))) {
    newState.currentTetromino.placement = {
      top: state.currentTetromino.placement.top + 1,
      left: state.currentTetromino.placement.left
    };
  } else if (newState.currentTetromino.placement.top === 0) {
    clearInterval(newState.intervalId);
    newState.newTetromino = false;
    newState.lose = true;
    newState.intervalId = null;
  } else {
    newState = addTetrominoToField(newState);
    newState = updateScore(newState);
    if (newState.permutation.length === 1) {
      newState.permutation = getPermutation();
    }
    newState.currentTetromino = newState.nextTetromino;
    newState.permutation = drop(newState.permutation);
    newState.nextTetromino = first(newState.permutation);
    newState.newTetromino = true;
  }
  return newState;
};

/**
 * After new tetromino is created store new intervalId to state
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const newTetrominoReducer = (state, action) => {
  const newState = clone(state);
  clearInterval(newState.intervalId);
  newState.newTetromino = false;
  newState.intervalId = action.payload.intervalId;
  return newState;
};

/**
 * on game start clear interval and assign new one if user lose game
 * start with inital state and assign new intervalId to state.
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const startGameReducer = (state, action) => {
  clearInterval(state.intervalId);
  const newState = state.lose ?
    getInitialState() :
  {...state, intervalId: action.payload.intervalId, isPaused: false};
  return newState;
};

/**
 * on restart clear interval, start with inital state and assign
 * new intervalId to state.
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const restartGameReducer = (state, action) => {
  clearInterval(state.intervalId);
  const newState = {
    ...getInitialState(),
    intervalId: action.payload.intervalId,
    isPaused: false
  };
  return newState;
};

/**
 * on restart clear interval, return initial state
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const quitGameReducer = (state) => {
  clearInterval(state.intervalId);
  return getInitialState();
};

/**
 * on pause clear interval, set intervalId to null and isPaused
 * to true than return new state
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const pauseGameReducer = (state) => {
  clearInterval(state.intervalId);
  return {...state, intervalId: null, isPaused: true};
};

/**
 * game reducer based on action type call appropriate reducer to return
 * new state of game
 * @param state<Object> - state of game
 * @returns {Object}
 */
export const game = (state = getInitialState(), action) => {
  let isGameStarted = state.intervalId;

  if (!isGameStarted && !_includes([START_GAME, RESTART_GAME], action.type)) {
    return state;
  }

  switch (action.type) {
    case START_GAME:
      return startGameReducer(state, action);
    case PAUSE_GAME:
      return pauseGameReducer(state);
    case RESTART_GAME:
      return restartGameReducer(state, action);
    case QUIT_GAME:
      return quitGameReducer(state);
    case ROTATE:
      return rotateReducer(state);
    case MOVE_LEFT:
      return moveLeftReducer(state);
    case MOVE_RIGHT:
      return moveRightReducer(state);
    case MOVE_DOWN:
      return moveDownReducer(state);
    case NEW_TETROMINO:
      return newTetrominoReducer(state, action);
  }
  return state;
};

//---------------------------------------------------------------------------------------------
//---------------------------- selectors  -------------------------------------------------------
//---------------------------------------------------------------------------------------------

export const mapStateToProps = state => {
  return {
    game: state.game
  };
};

//---------------------------------------------------------------------------------------------
//---------------------------- Action bind creators  --------------------------------------------
//---------------------------------------------------------------------------------------------
export const mapActionToDispatch = (dispatch) => {
  return bindActionCreators({
    rotate,
    moveLeft,
    moveRight,
    startGame,
    moveDown,
    pauseGame,
    unpauseGame,
    restartGame,
    quitGame,
    newTetromino
  }, dispatch)
};


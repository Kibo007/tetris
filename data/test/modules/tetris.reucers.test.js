import {
  rotateReducer,
  moveLeftReducer,
  moveRightReducer,
  newTetrominoReducer,
  startGameReducer,
  restartGameReducer,
  quitGameReducer,
  pauseGameReducer
} from '../../modules/tetris';

import initialState from './../fixtures/initialState';

let expect = require('chai').expect;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// 					reducers functions							/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Reducers functions', () => {
  it('should rotate tetromino and change shape in state', () => {
    const oldShape = initialState.currentTetromino.shape;
    let newState = rotateReducer(initialState);
    expect(newState.currentTetromino.shape).to.not.be.eql(oldShape);
  });

  it('should not move left tetromino and change placement in state ' +
    'because on left 4 position is already tetromino', () => {
    const oldShape = initialState.currentTetromino.placement;
    let newState = moveLeftReducer(initialState);
    expect(newState.currentTetromino.placement).to.be.eql(oldShape);
  });

  it('should move right tetromino and change placement in state', () => {
    const oldShape = initialState.currentTetromino.placement;
    let newState = moveRightReducer(initialState);
    expect(newState.currentTetromino.placement).to.not.be.eql(oldShape);
  });

  it('should move down tetromino and change placement in state', () => {
    const oldShape = initialState.currentTetromino.placement;
    let newState = moveRightReducer(initialState);
    expect(newState.currentTetromino.placement).to.not.be.eql(oldShape);
  });

  it('should assign new intervalId to state', () => {
    let newState = newTetrominoReducer(initialState, {payload: 213});
    expect(newState.intervalId).to.not.be.eql(initialState.intervalId);
  });

  it('should assign new intervalId in state on game start ', () => {
    let newState = startGameReducer(initialState, {payload: 22});
    expect(newState.intervalId).to.not.be.eql(initialState.intervalId);
  });

  it('should assign new intervalId in state on game restart ', () => {
    let newState = restartGameReducer(initialState, {payload: 222});
    expect(newState.intervalId).to.not.be.eql(initialState.intervalId);
  });

  it('should set initial state on game quit ', () => {
    let newState = quitGameReducer(initialState);
    expect(newState.intervalId).to.be.eql(null) ;
  });

  it('should set isPaused property to true and intervalId to null on Pause game', () => {
    let newState = pauseGameReducer(initialState);
    expect(newState.intervalId).to.be.eql(null) ;
    expect(newState.isPaused).to.be.true;
  });

});

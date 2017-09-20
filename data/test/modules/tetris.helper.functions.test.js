import {
  rotateLodash,
  getPermutation,
  getInitialState,
  getTetrominoCells,
  getCurrentTetrominoCells,
  Can,
  addTetrominoToField,
  updateScore
} from '../../modules/tetris';

import initialState, {matrix} from './../fixtures/initialState';

let expect = require('chai').expect;

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// 					helper functions							/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Helper function', () => {
  it('rotate tetromino in matrix', () => {
    let rotated = rotateLodash(matrix);
    expect(rotated).to.not.be.eql(matrix)
  });

  it('should create tetromino collection from constants of tetromino and colors', () => {
    let permutationTetromino = getPermutation();
    expect(permutationTetromino.length).to.eql(7)
    expect(permutationTetromino[0].color.length).to.eql(7);
    expect(permutationTetromino[0].shape.length).to.exist;
    expect(permutationTetromino[0].placement.top).to.eql(0);
    expect(permutationTetromino[0].placement.left).to.eql(4);
  });

  it('should create initial state of game tetris', () => {
    let initialState = getInitialState();
    expect(initialState).to.be.an('object').that.has.all.keys(
      'currentTetromino', 'permutation', 'nextTetromino', 'field',
      'intervalId', 'rows', 'level', 'newTetromino', 'lose');
  });

  it('should calculate tetromino cells position from offset and tetromino', () => {
    const offset = {"top": 8, "left": 4};
    const tetromino = [[0, 0, 1], [1, 1, 1]];

    let tetrominoCells = getTetrominoCells(tetromino, offset);
    const expectedTetrominoCells = [
      {top: 8, left: 6},
      {top: 9, left: 4},
      {top: 9, left: 5},
      {top: 9, left: 6}
    ];
    expect(expectedTetrominoCells).to.be.eql(tetrominoCells);
  });

  it('should calculate if tetromino can move left to be true', () => {
    const cells = [
      {top: 8, left: 6},
      {top: 9, left: 4},
      {top: 9, left: 5},
      {top: 9, left: 6}
    ];

    let canMoveLeft = Can.moveLeft(initialState, cells);
    expect(canMoveLeft).to.be.true;
  });

  it('should calculate if tetromino can move left to be false', () => {
    const cells = [
      {top: 0, left: 4},
      {top: 1, left: 4},
      {top: 2, left: 4},
      {top: 3, left: 4}
    ];

    let canMoveLeft = Can.moveLeft(initialState, cells);
    expect(canMoveLeft).to.be.false;
  });

  it('should calculate if tetromino can move down to be true', () => {
    const cells = [
      {top: 0, left: 4},
      {top: 1, left: 4},
      {top: 2, left: 4},
      {top: 3, left: 4}
    ];

    let canMoveDown = Can.moveDown(initialState, cells);
    expect(canMoveDown).to.be.true;
  });

  it('should calculate if tetromino can move down to be false', () => {
    const cells = [
      {top: 0, left: 3},
      {top: 1, left: 3},
      {top: 2, left: 3},
      {top: 3, left: 3}
    ];

    let canMoveDown = Can.moveDown(initialState, cells);
    expect(canMoveDown).to.be.false;
  });

  it('should calculate if tetromino can move right to be true', () => {
    const cells = [
      {top: 0, left: 4},
      {top: 1, left: 4},
      {top: 2, left: 4},
      {top: 3, left: 4}
    ];

    let canMoveRight = Can.moveRight(initialState, cells);
    expect(canMoveRight).to.be.true;
  });

  it('should calculate if tetromino can move right to be false', () => {
    const cells = [
      {top: 0, left: 2},
      {top: 1, left: 2},
      {top: 2, left: 2},
      {top: 3, left: 2}
    ];

    let canMoveRight = Can.moveRight(initialState, cells);
    expect(canMoveRight).to.be.false;
  });

  it('should calculate if tetromino can rotate right to be true', () => {
    const cells = [
      {top: 5, left: 7},
      {top: 6, left: 7},
      {top: 7, left: 7},
      {top: 8, left: 7}
    ];

    let canMoveRight = Can.rotate(initialState, cells);
    expect(canMoveRight).to.be.true;
  });

  it('should calculate if tetromino can rotate right to be false', () => {
    const cells = [
      {top: 2, left: 3},
      {top: 2, left: 3},
      {top: 2, left: 3},
      {top: 2, left: 3}
    ];

    let canMoveRight = Can.rotate(initialState, cells);
    expect(canMoveRight).to.be.false;
  });

  it('should return new state with tetromino added to matrix', () => {
    const matrixField = [
      null, null, null, null,
      '#5FB3B3', '#5FB3B3', '#5FB3B3',
      null, null, null
    ];

    let newState = addTetrominoToField(initialState);
    expect(newState.field.matrix[2]).to.be.eql(matrixField);
  });

  it('should return new state with level and rows updated', () => {
    let newState = updateScore(initialState);
    expect(initialState.level).to.be.eql(0);
    expect(initialState.rows).to.be.eql(0);

    expect(newState.level).to.be.eql(1);
    expect(newState.rows).to.be.eql(11);
  });

});

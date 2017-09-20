export const Dimensions = {
  Field: {
    width: 10,
    height: 20
  },
  Square: 20,
  NextTetromino: {
    width: 6,
    height: 2
  }
};

export const KeyCodes = {
  SPACE_BAR: 32,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  UP_ARROW: 38,
  S: 83
};

export const Shapes = {
  I: [[1, 1, 1, 1]],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ]
};

export const Colors = {
  Field: {
    backgroundColor: '#3863a0',
    border: '#1b2b34'
  },

  Tetrominos: [
    '#EC5f67',
    '#99C794',
    '#C594C5',
    '#ffeb3b',
    '#5FB3B3',
    '#FAC863',
    '#F99157'
  ]
};

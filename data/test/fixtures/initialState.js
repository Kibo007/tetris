export const matrix = [
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, '#ffff', null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null, null, null
  ]
];

export default {
  "currentTetromino": {
    "shape": [
      [0, 0, 1],
      [1, 1, 1]
    ],
    "color": "#5FB3B3",
    "placement": {
      "top": 1,
      "left": 4
    }
  },
  "permutation": [
    {
      "shape": [
        [0, 1, 0],
        [1, 1, 1]
      ],
      "color": "#FAC863",
      "placement": {
        "top": 0,
        "left": 4
      }
    },
    {
      "shape": [
        [1, 0, 0],
        [1, 1, 1]
      ],
      "color": "#F99157",
      "placement": {
        "top": 0,
        "left": 4
      }
    },
    {
      "shape": [
        [1, 1, 1, 1]
      ],
      "color": "#ffeb3b",
      "placement": {
        "top": 0,
        "left": 4
      }
    },
    {
      "shape": [
        [1, 1, 0],
        [0, 1, 1]
      ],
      "color": "#EC5f67",
      "placement": {
        "top": 0,
        "left": 4
      }
    },
    {
      "shape": [
        [1, 1],
        [1, 1]
      ],
      "color": "#C594C5",
      "placement": {
        "top": 0,
        "left": 4
      }
    },
    {
      "shape": [
        [0, 1, 1],
        [1, 1, 0]
      ],
      "color": "#99C794",
      "placement": {
        "top": 0,
        "left": 4
      }
    }
  ],
  "nextTetromino": {
    "shape": [
      [0, 1, 0],
      [1, 1, 1]
    ],
    "color": "#FAC863",
    "placement": {
      "top": 0,
      "left": 4
    }
  },
  "field": {
    cellAt: (top, left) => {
      if (matrix[top] !== undefined) {
        return matrix[top][left];
      }
      return undefined;
    },
    "matrix": [
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, '#ffffff', null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        null, null, null, null, null, null, null, null, null, null
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ],
      [
        '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff', '#ffff'
      ]

    ]
  },
  "intervalId": 38,
  "rows": 0,
  "level": 0,
  "newTetromino": false,
  "lose": false,
  "isPaused": false
}
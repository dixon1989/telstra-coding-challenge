export const orientation = {
  NORTH: { x: 0, y: 1 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
  EAST: { x: 1, y: 0 },
};

export const xAxis = {
  min: -1,
  max: 6,
};

export const yAxis = {
  min: -1,
  max: 6,
};

export const direction = {
  x: {
    "0": {
      y: {
        "1": "NORTH",
        "-1": "SOUTH",
      },
    },
    "1": {
      y: {
        "0": "EAST",
      },
    },
    "-1": {
      y: {
        "0": "WEST",
      },
    },
  },
};

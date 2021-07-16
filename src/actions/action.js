// Set Orientation Position for NORTH, SOUTH, EAST, WEST
export const orientation = {
  NORTH: { x: 0, y: 1 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
  EAST: { x: 1, y: 0 },
};

// Requirement for 6 x 6 table top, in this case I have set 6 on both x and y axis.

export const xAxis = {
  min: -1,
  max: 6,
};

export const yAxis = {
  min: -1,
  max: 6,
};

// Identify the direction on where the robot currently is
export const direction = {
  x: {
    0: {
      y: {
        1: "NORTH",
        "-1": "SOUTH",
      },
    },
    1: {
      y: {
        0: "EAST",
      },
    },
    "-1": {
      y: {
        0: "WEST",
      },
    },
  },
};

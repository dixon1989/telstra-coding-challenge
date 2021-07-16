import React from "react";
import "./App.css";
import { orientation, direction, xAxis, yAxis } from "./actions/action";
import ActionView from "./components/ActionView";

const initialState = {
  location: null,
  face: { x: 0, y: 0 },
  place: false,
  actions: [],
};

function App() {
  const [state, setState] = React.useState(initialState);
  const [value, setValue] = React.useState("");

  const clearState = () => {
    setValue("");
    setState({ ...initialState });
  };

  // Registering user event if valid
  const handlePress = (event) => {
    if (event.key === "Enter") {
      // Split by space and comma
      const inputLine = value.split(/[\s,]+/);
      // If the first word isn't a command, we ignore it
      // If Place length is only 3 add default North
      let command = inputLine[0];
      if (command === "PLACE") {
        if (inputLine.length >= 3) {
          const x = parseInt(inputLine[1], 10);
          const y = parseInt(inputLine[2], 10);
          let f = "";
          let face = "";
          if (inputLine.length === 3) {
            f = "NORTH";
            face = orientation[f];
          }
          if (inputLine.length === 4) {
            f = inputLine[3];
            face = orientation[f];
          }
          // Check if the robot is still on the table, and valid direction
          if (
            x > xAxis.min &&
            x < xAxis.max &&
            y > yAxis.min &&
            y < yAxis.max &&
            face
          ) {
            const placement =
              inputLine.length === 3
                ? `PLACE ${x},${y}`
                : `PLACE ${x},${y},${f}`;
            setState({
              ...state,
              location: { x, y },
              face,
              place: true,
              actions: [...state.actions, placement],
            });
          }
        }
      }
      // Ignore everything else until robot is placed
      if (state.place) {
        if (command === "MOVE") {
          const moveX = state.face.x;
          const moveY = state.face.y;
          // Make sure the robot won't fall off the table
          const nextX = state.location.x + moveX;
          const nextY = state.location.y + moveY;
          if (nextX > -1 && nextX < 5 && nextY > -1 && nextY < 5) {
            setState({
              ...state,
              location: { x: nextX, y: nextY },
              actions: [...state.actions, "MOVE"],
            });
          }
        } else if (command === "LEFT") {
          const x = state.face.x;
          const y = state.face.y;
          setState({
            ...state,
            face: { x: -y, y: x },
            actions: [...state.actions, "LEFT"],
          });
        } else if (command === "RIGHT") {
          const x = state.face.x;
          const y = state.face.y;
          setState({
            ...state,
            facing: { x: y, y: -x },
            actions: [...state.actions, "RIGHT"],
          });
        } else if (command === "REPORT") {
          const location = state.location;
          const report = `Output: ${location.x},${location.y},${
            direction.x[state.face.x.toString()].y[state.face.y.toString()]
          }`;
          setState({ ...state, actions: [...state.actions, "REPORT", report] });
        }
      }
      // Reset value in input
      setValue("");
    }
  };

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    setValue(value);
  };

  // Iterate through our actions to print to screen
  const action = state.actions.map((elem, index) => (
    <ActionView key={index} value={elem} />
  ));

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center">Toy Robot Simulator</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="input-group">
            <input
              onKeyPress={(e) => handlePress(e)}
              onChange={(e) => handleChange(e)}
              value={value}
              className="form-control"
              placeholder="Enter move here..."
            />
            {state.place ? (
              <button
                onClick={clearState}
                className="btn btn-danger btn-block mt-2"
              >
                Reset
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {state.place ? (
        <div className="row mt-2">
          <div className="col-md-8 offset-md-2">
            <ul className="list-group">{action}</ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

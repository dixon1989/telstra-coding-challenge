import React from "react";
import "./App.css";
import { orientation, direction, xAxis, yAxis } from "./actions/action";
import {
  Container,
  Button,
  InputContainer,
  useWindowSize,
  UlContainer,
} from "./components";

// initial state
const initialState = {
  location: null,
  face: { x: 0, y: 0 },
  place: false,
  actions: [],
};

function App() {
  // handle state
  const [state, setState] = React.useState(initialState);
  const [value, setValue] = React.useState("");
  let [winWidth] = useWindowSize();

  // handle user inputs make sure its uppercase
  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    setValue(value);
  };

  // clearState for testing purposes
  const clearState = () => {
    setValue("");
    setState({ ...initialState });
  };

  // Registering user event if valid
  const handlePress = (event) => {
    if (event.key === "Enter") {
      // Splitting the place inputs
      const inputLine = value.split(/[\s,]+/);

      let command = inputLine[0];
      if (command === "PLACE") {
        if (inputLine.length >= 3) {
          const x = parseInt(inputLine[1], 10);
          const y = parseInt(inputLine[2], 10);
          let f = "";
          let face = "";
          // If Place length is only 3 add default North
          if (inputLine.length === 3) {
            f = "NORTH";
            face = orientation[f];
          }
          // If Place length is as given record the robot orientation
          if (inputLine.length === 4) {
            f = inputLine[3];
            face = orientation[f];
          }
          // Check if the direction of the robot is still on the table and their direction is valid
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
      // Ignore everything else until a robot is placed
      if (state.place) {
        if (command === "MOVE") {
          const moveX = state.face.x;
          const moveY = state.face.y;
          //This is to make sure the robot is free to roam around the surface of the table, but must be prevented from falling to destruction.
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
      // Set the value back to empty for further instructions
      setValue("");
    }
  };

  return (
    <Container width={winWidth}>
      <div>
        <h1>Toy Robot Simulator</h1>
      </div>
      <div>
        <InputContainer
          onKeyPress={(e) => handlePress(e)}
          onChange={(e) => handleChange(e)}
          type={"text"}
          value={value}
          placeholder="Enter your move here..."
        />
        <br />
        <br />
        {state.place ? <Button onClick={clearState}>Reset</Button> : ""}
      </div>
      {state.place ? (
        <UlContainer>
          {state.actions.map((elem, index) => (
            <li key={index}>{elem}</li>
          ))}
        </UlContainer>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;

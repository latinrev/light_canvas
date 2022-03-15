import { useCallback, useEffect, useState } from "react";
import "./App.css";
const SIZE = 8;

export default function App() {
  const [grid, setGrid] = useState([]);
  const [matrix, setMatrix] = useState([
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
    Array.from(Array(8)).map((curr) => 0),
  ]);
  console.log(matrix);
  useEffect(() => {
    SetupGrid();
    return () => {
      setGrid([]);
    };
  }, []);

  const generateMatrix = () => {
    JSON.stringify(matrix)
      .replaceAll("[", "{")
      .replaceAll("]", "}")
      .replaceAll('"1"', 1)
      .replaceAll('"0"', 0);
  };

  const handleClick = useCallback(
    (e) => {
      let element = e.currentTarget;
      let x = element.getAttribute("x");
      let y = element.getAttribute("y");
      if (element.className.includes("On")) {
        element.className = "Square";
        element.setAttribute("status", 0);
      } else {
        element.setAttribute("status", 1);
        element.className = "Square On";
      }
      let status = element.getAttribute("status");

      let newMatrix = [...matrix];
      newMatrix[x][y] = status;
      setMatrix([...newMatrix]);
    },
    [matrix]
  );
  const SetupGrid = () => {
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        setGrid((prev) => [...prev, SetupItem(x, y)]);
      }
    }
  };
  const SetupItem = (x, y) => {
    return (
      <div onClick={handleClick} status="0" className="Square" x={x} y={y} />
    );
  };

  return (
    <div className="App">
      {grid.map((tile) => tile)}
      <button onClick={generateMatrix} title="Generate Matrix" />
    </div>
  );
}

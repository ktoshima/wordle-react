import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/words')
      .then(res => res.json())
      .then((solutionList) => {
        setSolution(solutionList[Math.floor(Math.random() * solutionList.length)]);
      });

  }, [setSolution]);


  return (
    <div className="App">
      <h1>Wordle with React</h1>
      { solution && <Wordle solution={solution.word}/> }
    </div>
  );
}

export default App;

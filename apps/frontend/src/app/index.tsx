import "./styles.css";
import { CounterButton } from "@repo/ui/counter-button";
import { Link } from "@repo/ui/link";

function App() {
  return (
    <div className="container">
      <h1 className="title">
        Admin <br />
        <span>Real Talk</span>
      </h1>
      <CounterButton />
      <p className="description"></p>
    </div>
  );
}

export default App;

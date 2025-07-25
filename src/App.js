
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <Search defaultCity="Mashhad" />
      <footer className="text-white text-center">
        Powered by SheCodes API and  open-sourced on{" "}
        <a
          href="https://github.com/Somayyeh094/react-weather-project"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default App;

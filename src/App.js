import logo from './CrabLogo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="blue-bar"></div>
      </header>
      <div className="App-content">
        {/* Your app content goes here */}
      </div>
      <footer className="App-footer">
        <div className="blue-bar"></div>
      </footer>
    </div>
  );
}

export default App;
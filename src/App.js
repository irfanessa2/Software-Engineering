import logo from './CrabLogo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="company-name">Express Firm Ltd.</h1>
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
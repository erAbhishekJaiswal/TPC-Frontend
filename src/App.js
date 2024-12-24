import Body from './components/Body';
import {Toaster} from "react-hot-toast"
import './App.css';
// import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Body />
      <Toaster/>
      </header>
    </div>
  );
}
export default App;


//frontend can be accessed from http://localhost:3000
// command- npm start
//for backend can be accessed from http://localhost:5000
// command- npm run dev
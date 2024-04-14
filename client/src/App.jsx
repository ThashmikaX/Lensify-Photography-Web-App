import './App.css'
import { Landing } from './pages'
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bg from './assets/images/bg.jpg'

function App() {
  return (
    <Router>
      <div className="container1">
        <Navbar />
        <Routes className="container2">
          <Route path="/" element={<Landing className='Landing' />}  />
        </Routes>
        <img src={bg} className='main-bg'/>
      </div>
      
    </Router>
  );
};

export default App

import './App.css'
import { Landing } from './pages'
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container1">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing className='Landing' />}  />
        </Routes>
      </div>
      
    </Router>
  );
};

export default App

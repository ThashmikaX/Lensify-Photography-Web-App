import './App.css'
import { Landing } from './pages'
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bg from './assets/images/bg.jpg'
import styled from "styled-components";
import AccountBox from "../src/pages/accountBox"

function App() {
  const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
  
  return (
    <Router>
      <div className="container1">
        <Navbar />
        <Routes className="container2">
          <Route path="/" element={<Landing className='Landing' />} />
          <Route path='/login' element={<AppContainer><AccountBox /></AppContainer>} />
        </Routes>
        <img src={bg} className='main-bg'/>
      </div>
      
    </Router>
  );
};

export default App

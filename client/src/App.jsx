import './App.css'
import { Landing } from './pages'
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bg from './assets/images/bg.jpg'
import styled from "styled-components";
import AccountBox from "../src/pages/accountBox"
import { Link, Element } from 'react-scroll';

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
        <Navbar className="nav-bar"></Navbar>
        <Routes className="container2">
          <Route path="/" element={
            <>
              {/* <Link to="section1" smooth={true}>Go to Section 1</Link>
              <Link to="section2" smooth={true}>Go to Section 2</Link> */}

              <Element name="section1" className='Landing section1'>
                <Landing />
                <img src={bg} className='main-bg'/>
              </Element>
              <Element name="section2">
              </Element>
            </>
          } />
          <Route path='/login' element={<AppContainer><AccountBox /></AppContainer>} />
        </Routes>
        
      </div>
      
    </Router>
  );
};

export default App

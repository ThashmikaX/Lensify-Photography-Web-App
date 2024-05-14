import './App.css'
import { Landing, CompleteProf, Dashboard, ClippedDrawer	 } from './pages'
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bg from './assets/images/bg.jpg'
import styled from "styled-components";
import AccountBox from "../src/pages/accountBox"
import { Link, Element } from 'react-scroll';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop){
        setHideNav(true);
      } else {
        setHideNav(false);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

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
        {!hideNav && <Navbar className="nav-bar"links={[
          { name: 'Home', to: 'section1' },
          { name: 'Info', to: 'section2' },
          { name: 'Tours', to: 'section3' },
          { name: 'Gallery', to: 'section4' },
          { name: 'About us', to: 'section5' }
  
]} />}
        <Routes className="container2">
          <Route path="/" element={
            <>
              <Element name="section1" className='Landing section1'>
                <Landing />
                <img src={bg} className='main-bg'/>
              </Element>
              <Element name="section2" className='Landing section1'>
              </Element>
            </>
          } />
          <Route path='/login' element={<><AppContainer><AccountBox /></AppContainer><img src={bg} className='main-bg' /></>} />
          <Route path='/complete' element={<><AppContainer><CompleteProf /></AppContainer><img src={bg} className='main-bg' /></>} />
          <Route path='/dashboard' element={<><div className='content-window'><Dashboard/></div><img src={bg} className='main-bg' /></>} />
        </Routes>
        
      </div>
      
    </Router>
  );
};

export default App

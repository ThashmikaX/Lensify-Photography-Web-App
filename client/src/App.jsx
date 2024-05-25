import './App.css'
import { Landing, Dashboard, LoginForm, RegisterForm	 } from './pages'
import { Navbar } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import bg from './assets/images/bg.jpg'
import { Link, Element } from 'react-scroll';
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './auth/Auth';

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
  
  return (
    <AuthProvider>
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
            <Route path='/login' element={<><LoginForm /><img src={bg} className='main-bg' /></>} />
            <Route path='register' element={<><RegisterForm /><img src={bg} className='main-bg'/></>}/>
            <Route path='/complete' element={<img src={bg} className='main-bg' />} />
            <Route path='/dashboard' element={<><div className='content-window'><Dashboard/></div></>} />
        </Routes>
        
      </div>
      
    </Router>
    </AuthProvider>
  );
};

export default App

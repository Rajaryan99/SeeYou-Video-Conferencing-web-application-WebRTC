import React from 'react'
import {Link} from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='landingPageContainer'>

      {/* Navbar */}
      <nav>
          <div className="navHeader">
            <h2>See<span className='you'>You </span></h2>
          </div>
          <div className="navList">
            <div role='button' className='register-btn'>
                <Link to={'/home'} style={{color: 'rgb(208, 2, 70)'}}>Join as guest</Link>
              </div>
              <div role='button' className='register-btn'>
                <Link to={'/auth'} style={{color: 'rgb(208, 2, 70)'}}>Register</Link>
              </div>
            <div role='button' className='btn'>
              <Link to={'/auth'} style={{color: '#fff'}}>Login</Link>
            </div>
          </div>
      </nav>

{/* HeroSection */}
      <div className="landingMainContainer">
          <div className="leftSection">
           <h1> <span style={{color: 'rgb(208, 2, 70)'}}>Connect</span> with your loved ones!!!</h1> 
           <p>Cover a distance by SeeYou ...</p>
           <div role='button' className='getStarted btn'>
            <Link className='getStarted' to={'/auth'}>Get Started</Link>
           </div>
          </div>
          <div className="rightSection">
            <img src="/mobile.png" alt="" />
          </div>
      </div>
    </div>
  )
}

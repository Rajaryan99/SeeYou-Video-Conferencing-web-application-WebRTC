import React from 'react'
import {Link} from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className='landingPageContainer'>

      {/* Navbar */}
      <nav>
          <div className="navHeader">
            <h2>See<span className='you'>You </span>'__'</h2>
          </div>
          <div className="navList">
            <p>Join as Guest</p>
            <p>Register</p>
            <div role='button' className='btn'>
              <Link to={'/auth'}>Login</Link>
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

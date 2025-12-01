import React from 'react'

export default function LandingPage() {
  return (
    <div className='landingPageContainer'>
      <nav>
          <div className="navHeader">
            <h2>See<span className='you'>You </span>'__'</h2>
          </div>
          <div className="navList">
            <p>Join as Guest</p>
            <p>Register</p>
            <div role='button'>
              <p>Login</p>
            </div>
          </div>
      </nav>
    </div>
  )
}

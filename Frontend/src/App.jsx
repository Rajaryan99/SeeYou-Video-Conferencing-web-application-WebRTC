import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from '../pages/LandingPage';
import Authentication from '../pages/authentication';
import { AuthProvider } from '../contexts/AuthContext';
import VideoMeet from '../pages/VideoMeet'


function App() {

  return (
    <>
      <div>
        <BrowserRouter>

          <AuthProvider>


            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/auth' element={<Authentication />} />
              <Route path='/:url' element={<VideoMeet />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

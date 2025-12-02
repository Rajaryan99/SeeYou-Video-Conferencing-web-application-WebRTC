import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LandingPage from '../pages/LandingPage';
import Authentication from '../pages/authentication';
import { AuthProvider } from '../contexts/AuthContext.jsx';


function App() {
  
  return (
    <>
      <div>
      <BrowserRouter>

      {/* <AuthProvider> */}

      
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/auth' element={<Authentication/>}/>
        </Routes>
      {/* </AuthProvider> */}
      </BrowserRouter>
      </div>
    </>
  )
}

export default App

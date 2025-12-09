import React, { useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
// import '../src/App'
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';



function Home() {


    const navigator =useNavigate();
const [meetingCode, setMeetingCode] = useState("");

let handleJoinVideoCall = async () => {
    navigator(`/${meetingCode}`)
}

  return (
  <>
  <div className="navBar">
    <div style={{display: 'flex', alignItems: "center"}}>
    <h3>SeeYou</h3>
    </div>

    <div className="div" style={{display:'flex', alignItems: "center"}}>
        <IconButton>
            <RestoreIcon/>
            <p>History</p>
        </IconButton>
        <Button onClick={() => {
            localStorage.removeItem("token");
            navigator('/auth')
        }} >
            LogOut
        </Button>
    </div>
  </div>
  
  </>
  )
}

export default withAuth(Home)
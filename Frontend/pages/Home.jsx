import React, { useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
// import '../src/App'
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Home() {


    const navigator = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    let handleJoinVideoCall = async () => {
        navigator(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar">
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <h2>SeeYou</h2>
                </div>

                <div className="div" style={{ display: 'flex', alignItems: "center" }}>
                    <IconButton>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>
                    <Button onClick={() => {
                        localStorage.removeItem("token");
                        navigator('/auth')
                    }} >
                        LogOut
                    </Button>
                </div>
            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Providing Quality Video Call</h2>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
                            <Button onClick={handleJoinVideoCall}>Join</Button>
                        </div>
                    </div>
                </div>

                <div className="rightPanel">
                    <img src="/logo3.png" alt="" />
                </div>
            </div>

        </>
    )
}

export default withAuth(Home)
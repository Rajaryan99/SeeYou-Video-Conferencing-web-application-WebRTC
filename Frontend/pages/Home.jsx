import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
// import '../src/App'
import IconButton from '@mui/material/IconButton';
import RestoreIcon from '@mui/icons-material/Restore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../contexts/AuthContext';



function Home() {


    const navigator = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const {addToUserHistory} = useContext(AuthContext)
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigator(`/${meetingCode}`)
    }

    return (
        <>
        <div className='homePage '>
            <div className="navBar">
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <h2>See<span style={{color: 'rgb(208, 2, 70)'}}>You</span></h2>
                    <hr />
                </div>

                <div className="navbarLeft" style={{ display: 'flex', alignItems: "center" }}>
    
                    <IconButton onClick={
                        () => {
                            navigator('/history')
                        }
                    }>
                        <RestoreIcon style={{color:"#fff"}} />
                    </IconButton>
                    <p style={{ marginRight: "20px"}}>History</p>
            
            
                    <Button  className='logoutbtn' onClick={() => {
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
                        <h1>See<span style={{color: 'rgb(208, 2, 70)'}}>You ...</span></h1> <br />
                        <h2 className='heading'>Providing Quality Video Call</h2>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
                            <Button  variant="contained" onClick={handleJoinVideoCall} >Join</Button>
                        </div>
                    </div>
                </div>

                <div className="rightPanel">
                    <img src="/logo3.png" alt="" />
                </div>
            </div>

            <div className='footer'>
                <h3>Love from SeeYou &#9825;</h3>
                <p>Hope you have a great Experience!!</p>
            </div>
</div>
        </>
    )
}

export default withAuth(Home)
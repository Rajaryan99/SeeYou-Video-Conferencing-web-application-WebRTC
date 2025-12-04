import React, { use, useEffect, useRef, useState } from 'react';
// import '../src/styles/VideoMeet'
import '../src/App';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const serverUrl = "http://localhost:5000";

var connections = {};

const peerConfigConnectons = {
    "iceServer": [
        {"urls": "stun:stun.l.google.com:19302"}
    ]
}

export default function VideoMeet() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoRef = useRef();


    const [videoAvailable, setVideoAvailable] = useState(true);

    const [audioAvailable, setAudioAvailable]  = useState(true);

    const [video, setVideo] = useState();

    const [audio, setAudio] = useState();

    const [screen, setScreen] = useState();

    const [showModel, setShowModel] = useState();

    const [screenAvailable, setScreenAvailable] = useState();

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [newMessages, setNewMessages] = useState(0);

    const [askUsername, setAskUsername]  = useState(true);

    const [username, setUsername] = useState("");

    const videoRef  = useRef([]);

    const [videos, setVideos] = useState([]);

    // if(isChrome() === false){

    // }

    const getPermissions = async () => {
      try {

        //video permission
        const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});

        if(videoPermission){
          setVideoAvailable(true);
        } else {
          setVideoAvailable(false);
        }

        //Auido permission
        const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true});

        
        if(audioPermission){
          setAudioAvailable(true);
        } else {
          setAudioAvailable(false);
        }

        if(navigator.mediaDevices.getDisplayMedia){
          setScreenAvailable(true);
        }else {
          setScreenAvailable(false)
        }

        if(videoAvailable || audioAvailable){
          const userMediaStream   = await navigator.mediaDevices.getUserMedia({video: videoAvailable, audi: audioAvailable});

          if(userMediaStream){
            window.localStream = userMediaStream;
            if(localVideoRef.current){
              localVideoRef.current.srcObject = userMediaStream;
            }
          }
        }

      } catch (error) {
        console.log("Permission Denied!!", error.message)
      }
    }



    useEffect(() => {
          getPermissions();
    }, [])

  return (
    <div>

      
    {askUsername === true ? 
        <div>

        <h2>Enter into Lobby</h2>
        <TextField id="outlined-basic" label="Username" value={username} onChange={e => {setUsername(e.target.value)}} variant="outlined"  />
        <Button variant="contained">Connect</Button>
        </div> : <></>
    }

    <div>
      <video ref={localVideoRef} autoPlay muted></video>
    </div>
    </div>
  )
}

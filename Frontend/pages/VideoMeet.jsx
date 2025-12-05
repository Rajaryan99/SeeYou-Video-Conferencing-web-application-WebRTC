import React, { use, useEffect, useRef, useState } from 'react';
// import '../src/styles/VideoMeet'
import '../src/App';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { io } from "socket.io-client";




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

    const [video, setVideo] = useState([]);

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

    useEffect(() => {
          getPermissions();
    }, [])

    const getPermissions = async () => {
      try {

        //video permission
        const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});

        if(videoPermission){
          setVideoAvailable(true);
          console.log("video permission granted!")
        } else {
          setVideoAvailable(false);
          console.log("Video permission denied")

        }

        //Auido permission
        const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true});

        
        if(audioPermission){
          setAudioAvailable(true);
          console.log("Audio permission granted!!")
        } else {
          setAudioAvailable(false);
          console.log("Audio permission denied")

        }

        if(navigator.mediaDevices.getDisplayMedia){
          setScreenAvailable(true);
        }else {
          setScreenAvailable(false)
        }

        if(videoAvailable || audioAvailable){
          const userMediaStream   = await navigator.mediaDevices.getUserMedia({video: videoAvailable, audio: audioAvailable});

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
      if(video !== undefined && audio !== undefined){
        getUserMedia();
      }
    }, [video, audio])


    

    let getUserMediaSuccess = (stream) => {

    }
    const getUserMedia = () => {
      if((video && videoAvailable) || (audio && audioAvailable)) {
        navigator.mediaDevices.getUserMedia({video: video, audio: audio})
        .then(getUserMediaSuccess) // todo
        .then((stream) => { })
        .catch((e) => {
          console.log(e)
        })
      } else {
        try {
          let tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        } catch (error) {
          console.log(e);
        }
      }
    }

   let gotMessageFromServer = (fromId, message) => {

   }
   
   let addMessage = () => {

   }

    let connectToSocketServer = () => {
      socketRef.current = io.connect(serverUrl, {secure: false})

      socketRef.current.on('signal', gotMessageFromServer);

      socketRef.current.on('connect', () => {
        socketRef.current.emit("join-call", window.location.href)

        socketIdRef.current = socketRef.current.id;

        socketRef.current.on("chat-message", addMessage)

        socketRef.current.on('user-left', (id) => {
          setVideo((video)=>video.filter((video) => video.socketId !== id))
        })

        socketRef.current.on("user-joined", (id, clients) => {
          clients.forEach((socketListId) => {
            connections[socketListId] = new  RTCPeerConnection(peerConfigConnectons)
          })
        })

      })



    }


    let getMedia = () => {
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      connectToSocketServer();
    }

    let connect = () => {
      setAskUsername(false);
      getMedia();
      
    }


  return (
    <div>

      
    {askUsername === true ? 
        <div>

        <h2>Enter into Lobby</h2>
        <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined"  />
        <Button variant="contained" onClick={connect}>Connect</Button>
        </div> : <></>
    }

    <div>
      <video ref={localVideoRef} autoPlay muted></video>
    </div>
    </div>
  )
}

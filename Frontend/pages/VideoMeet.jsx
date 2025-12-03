import React, { use, useRef, useState } from 'react';
// import '../src/styles/VideoMeet'
import '../src/App'

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

    if(isChrome() === false){

    }

  return (
    <div>
      
    {askUsername === true ? 
        <div>



        </div> : <></>
    }

    </div>
  )
}

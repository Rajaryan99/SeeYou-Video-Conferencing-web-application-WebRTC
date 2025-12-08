import React, { use, useEffect, useRef, useState } from 'react';
// import '../src/styles/VideoMeet'
import '../src/App';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { io } from "socket.io-client";
import '../src/videoMeet.css';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEnd from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat'





const serverUrl = "http://localhost:5000";

var connections = {};

const peerConfigConnectons = {
  "iceServer": [
    { "urls": "stun:stun.l.google.com:19302" }
  ]
}

export default function VideoMeet() {

  var socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoRef = useRef();


  const [videoAvailable, setVideoAvailable] = useState(true);

  const [audioAvailable, setAudioAvailable] = useState(true);

  const [video, setVideo] = useState([]);

  const [audio, setAudio] = useState();

  const [screen, setScreen] = useState();

  const [showModel, setShowModel] = useState();

  const [screenAvailable, setScreenAvailable] = useState();

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [newMessages, setNewMessages] = useState(4);

  const [askUsername, setAskUsername] = useState(true);

  const [username, setUsername] = useState("");

  const videoRef = useRef([]);

  const [videos, setVideos] = useState([]);

  // if(isChrome() === false){

  // }

  useEffect(() => {
    getPermissions();
  }, [])

  const getPermissions = async () => {
    try {

      //video permission
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoPermission) {
        setVideoAvailable(true);
        console.log("video permission granted!")
      } else {
        setVideoAvailable(false);
        console.log("Video permission denied")

      }

      //Auido permission
      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });


      if (audioPermission) {
        setAudioAvailable(true);
        console.log("Audio permission granted!!")
      } else {
        setAudioAvailable(false);
        console.log("Audio permission denied")

      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false)
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });

        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }

    } catch (error) {
      console.log("Permission Denied!!", error.message)
    }
  }


  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [video, audio])




  let getUserMediaSuccess = (stream) => {
    try {

      window.localStream.getTracks().forEach(track => track.stop())

    } catch (error) {
      console.log(e)
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream)

      connections[id].createOffer().then((description) => {
        connections[id].setLocalDescription(description)
          .then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
          })
          .catch(e => console.log(e))

      })
    }

    stream.getTracks().forEach(track => track.onended = () => {
      setVideo(false);
      setAudio(false);

      try {
        let tracks = localVideoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      } catch (error) {
        console.log(error)
      }
      //TODO blackSilence
      let blackSilence = (...args) => new MediaStrame([black(...args), silence()])
      window.localStream = blackSilence();
      localVideoRef.current.srcObject = window.localStream;


      for (let id in connections) {
        connections[id].addStream(window.localStream)
        connections[id].createOffer().then((description) => {
          connections[id].setLocalDescription(description)
            .then(() => {
              socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
            }).catch(e => console.log(e))
        })
      }

    })

  }


  let silence = () => {
    let ctx = new AudioContext()
    let oscillator = ctx.createOscillator()

    let dst = oscillator.connect(ctx.createMediaStreamDestination());

    oscillator.start();
    ctx.resume()
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
  }

  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height });

    canvas.getContext('2d'.fillRect(0, 0, width, height));
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false })
  }

  const getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
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
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
          if (signal.sdp.type === 'offer') {


            connections[fromId].createAnswer().then((description) => {
              connections[fromId].setLocalDescription(description).then(() => {
                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
              }).catch(e => console.log(e))
            }).catch(e => console.log(e))
          }
        }).catch(e => console.log(e))
      }
      if (signal.ice) { // ice Interactive Connectivity Establishment
        try{
        connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice))
        } catch(e) {
          console.log(e)
        }
      }
    }
  }

  //todo addmessage
  let addMessage = () => {

  }

  //create peer connection
//   const createPeerConnection = (peerId) => {
//   // create and configure PC
//   const pc = new RTCPeerConnection({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
//   });

//   // ensure pendingCandidates bucket exists
//   pendingCandidates[peerId] = pendingCandidates[peerId] || [];

//   // ICE candidates from this peer -> send to remote via socket
//   pc.onicecandidate = (event) => {
//     if (event.candidate) {
//       if (socketRef?.current) {
//         socketRef.current.emit("signal", peerId, JSON.stringify({ ice: event.candidate }));
//       }
//     }
//   };

//   // modern track handler: remote track arrives
//   pc.ontrack = (event) => {
//     const remoteStream = (event.streams && event.streams[0]) || null;
//     if (!remoteStream) return;

//     // update or add video in state
//     const videoObj = { socketId: peerId, stream: remoteStream, autoPlay: true, playsInline: true };

//     setVideos(prev => {
//       const arr = Array.isArray(prev) ? prev : [];
//       const exists = arr.find(v => v.socketId === peerId);
//       let updated;
//       if (exists) {
//         updated = arr.map(v => v.socketId === peerId ? { ...v, stream: remoteStream } : v);
//       } else {
//         updated = [...arr, videoObj];
//       }
//       videoRef.current = updated;
//       return updated;
//     });
//   };

//   // handle connection state changes (optional logging)
//   pc.onconnectionstatechange = () => {
//     // debugging help
//     // console.log("PC state for", peerId, pc.connectionState, pc.iceConnectionState);
//   };

//   // save
//   connections[peerId] = pc;
//   return pc;
// };




  //connect to socket server
  let connectToSocketServer = () => {
    socketRef.current = io.connect(serverUrl, { secure: false })

    socketRef.current.on('signal', gotMessageFromServer);

    socketRef.current.on('connect', () => {
      socketRef.current.emit("join-call", window.location.href)

      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage)

      socketRef.current.on('user-left', (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id))
      })

      socketRef.current.on("user-joined", async (id, clients) => {
        clients.forEach((socketListId) => {


          connections[socketListId] = new RTCPeerConnection(peerConfigConnectons)


          connections[socketListId].onicecandidate = (event) => {
            if (event.candidate != null) {
              socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
            }
          }

          connections[socketListId].onaddstream = (event) => {

            let videoExists = videoRef.current.find(video => video.socketId === socketListId);

            if (videoExists) {
              setVideos(videos => {
                const updatedVideos = videos.map(video =>
                  video.socketId === socketListId ? { ...video, stream: event.stream } : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              })
            } else {

              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoPlay: true,
                playinline: true
              }

              setVideos(videos => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              })
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            // let blackSilence

            let blackSilence = (...args) => new MediaStrame([black(...args), silence()])
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }

        })


        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue

            try {
              connections[id2].addStream(window.localStream)
            } catch (error) { }

            connections[id2].createOffer().then((description) => {
              connections[id2].setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit("signal", id2, JSON.stringify({ "spd": connections[id2].localDescription })) //sdp = session description
                })
                .catch(e => console.log(e))
            })

          }
        }

      })

    })



  }


  let handleVideo = () => {
        setVideo(!video);
  }

  const handleAudio = () => {
        setAudio(!audio)
  }

  const handleScreen = () => {
    setScreen(!screen)
  }

let getDislayMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoRef.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoRef.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoRef.current.srcObject = window.localStream

            getUserMedia()

        })
    }




  const getDisplayMedia = () => {
    if(screen) {
      if(navigator.mediaDevices.getDisplayMedia){
        navigator.mediaDevices.getDisplayMedia({video: true, audio: true})
        .then(getDislayMediaSuccess)
        // .then((stream) => {})
        .catch((e) => console.log(e))
      }
    }
  }

  useEffect(() => {
    if(screen !== undefined){
      getDisplayMedia();
    }
  }, [screen])

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
          <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
          <Button variant="contained" onClick={connect}>Connect</Button>


          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
        </div> : <div className='meetVideoContainer'>


              <div className="buttonContainer">
                      <IconButton onClick={handleVideo} style={{color: "#fff"}}>
                        {(video === true) ? <VideocamIcon/> : <VideocamOffIcon/>}
                      </IconButton>
                      <IconButton style={{color: "red"}}>
                         <CallEnd/>
                      </IconButton>
                      <IconButton onClick={handleAudio} style={{color: "#fff"}}>
                         {audio == true ? <MicIcon/> : <MicOff/>} 
                      </IconButton>

                      {screenAvailable === true ? 
                      <IconButton onClick={handleScreen} style={{color: "#fff"}}>
                        {screen === true ? <ScreenShareIcon/> : <StopScreenShareIcon/> }
                      </IconButton> : <></>}

                      <Badge badgeContent={newMessages} max={999} color='secondary'>
                        <IconButton style={{color: "#fff"}}>
                          <ChatIcon/>
                        </IconButton>
                      </Badge>
              </div>

              <video className='meetUserVideo' ref={localVideoRef} autoPlay muted></video>

              <div className='conferenceView'>
            {videos.map((video) => (
              <div  key={video.socketId}>
                  <video
                   data-socket={video.socketId}
                   ref={ref => {
                    if(ref && video.stream){
                      ref.srcObject = video.stream;
                    }
                   }}
                   autoPlay
                  >
                   
                  </video>
              </div>
            ))}
        </div>
        </div>

      }


    </div>
  
  )


}

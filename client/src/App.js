import './App.css';
import {useState} from 'react'
import io from 'socket.io-client' //for establishing connection
import Chat from './Chat';

const socket = io.connect("https://chatapp1-pqr6.onrender.com") //connecting frontend to backend

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = ()=>{
    if(username !== '' && room !== ''){
      socket.emit("join_room", room); //passing data from frontend to backend and room will be received as data
      setShowChat(true)
    }
  }

  return (
    <div className="App">
    {!showChat ? (
      <div className="joinChatContainer">
        <h3>Enter a room</h3>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join the chat</button>
      </div>
    ) : (
      <Chat socket={socket} username={username} room={room} />
    )}
  </div>
  );
}

export default App;

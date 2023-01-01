import React, { useContext } from 'react'
import "../style/chat.scss"
import videoCamera from "../img/video-camera.png"
import addGroup from "../img/add-group.png"
import more from "../img/more.png"
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {
  const {data} = useContext(ChatContext)

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={videoCamera} alt=''></img>
          <img src={addGroup} alt=''></img>
          <img src={more} alt=''></img>
        </div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  )
}

export default Chat
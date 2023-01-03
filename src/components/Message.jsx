import React ,  { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'


const Message = (props) => {
  const { currentUser} = useContext(AuthContext);
  const {data } = useContext(ChatContext);
  const ref = useRef()

  var previousMessage = props.previousMessage;
  var currentMessage = props.message;
  var isFirstMessage = false;
  if(previousMessage === undefined){
    previousMessage = currentMessage
    isFirstMessage = true
  } 

  useEffect(()=> {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [props.message]);


  const showAvatar = (previousMessage , currentMessage) => {

    if(previousMessage.senderId === currentMessage.senderId && !isFirstMessage){
      return {display:"none"}
    }else{
      return {}
    }
  }


  return (
    <div ref={ref}
    className={`message ${props.message.senderId === currentUser.uid && "owner"} ${previousMessage.senderId === currentMessage.senderId && "firstMessage"}`}>
      <div className= {`messageInfo`} >
        <img 
        style={showAvatar(previousMessage , currentMessage)}
        src={
          props.message.senderId === currentUser.uid
          ? currentUser.photoURL
          : data.user.photoURL
        } alt=''></img>
        <span>{""}</span>
      </div>
      <div className="messageContent">
        <p>{props.message.text}</p>
       {props.message.img && <img src={props.message.img} alt=''></img>}
      </div>
    </div>
  )
}

export default Message
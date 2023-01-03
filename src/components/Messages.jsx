import React, {useContext ,useState , useEffect } from 'react'
import Message from './Message'
import "../style/messages.scss"
import { ChatContext } from '../context/ChatContext'
import {doc , onSnapshot} from "firebase/firestore";
import {db} from"../firebase"

const Messages = () => {

  const {data} = useContext(ChatContext)
  const[messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db , "chats" , data.chatId) , (doc) => {
        doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
        unsub();
    }; 
}, [data.chatId]);

  return (
    <div className="messages">
        {messages.map((m , index) => (
          <Message message= {m} previousMessage={messages[index - 1]} key={m.id}/>
        ))}
    </div>
  )
}

export default Messages
import React, {useContext , useState} from 'react'
import "../style/input.scss"
import attachment from "../img/attachment.png"
import image from "../img/image.png"
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { arrayUnion, Timestamp, updateDoc , doc, serverTimestamp } from 'firebase/firestore'
import { v4 as uuid } from "uuid"
import {db, storage} from"../firebase"
import { uploadBytesResumable , ref , getDownloadURL} from 'firebase/storage'


const Input = () => {
  const[text , setText ] = useState("");
  const[img , setImg ] = useState(null);

  const { currentUser} = useContext(AuthContext);
  const {data } = useContext(ChatContext);

  const handleSend = async () => {
    if(img){
      const storageRef = ref(storage , uuid());
      const uploadTask = uploadBytesResumable(storageRef , img);

      uploadTask.on(
        (error) => {
          //setErr(true)
        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats" , data.chatId) ,{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              }),
            });
          });
        }
      );

    }else{
        await updateDoc(doc(db, "chats" , data.chatId) ,{
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId:currentUser.uid,
            date: Timestamp.now(),
          }),
        });
    }

    await updateDoc(doc(db, "userChats" , currentUser.uid) ,{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),
    })

    await updateDoc(doc(db, "userChats" , data.user.uid) ,{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp(),
    })

    setText("")
    setImg(null)
  };
  return (
    <div className="Input">
      <input type="text" placeholder='Schreib was ... ' onChange={e=>setText(e.target.value)} value={text}></input>
      <div className="send">
        <img src={attachment} alt=''></img>
        <input type="file" style={{display:"none"}} id="file" onChange={e=>setImg(e.target.files[0])}></input>
        <label htmlFor='file'>
          <img src={image} alt=''></img>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
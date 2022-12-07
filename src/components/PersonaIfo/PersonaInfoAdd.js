import MyPage from '../MyPage'
import React, {useContext, useState, useEffect, useRef} from 'react';
import '../PersonaIfo/PersonaInfoAdd.css'
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy , updateDoc} from "firebase/firestore";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { debugErrorMap } from 'firebase/auth';
import Container from 'react-bootstrap/Container';


const PersonaInfoAdd = ({messagesDat, getMessages, handleAddFormHide, handleEditFormHide}) => {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth)
  const [nameUser, setValue] = useState('')
  const [surnamUser, setValue1] = useState('')
  const [numberUser, setValue2] = useState('')
  const [workUser, setValue3] = useState('')
  const [statusUser, setValue4] = useState('')
  const [uid, setValue6] = useState('')
  const [messagesData, setMessagesData] = useState(messagesDat); //  (withdrawBlog)
  const [keyBlog, setMessagesKey] = useState([]);
  const [formState, showAddForm] = useState(0)

  

 
 const uploadFiles = (file) => {
  if (!file) return;
  const storage = getStorage();
  const mountainsRef  = ref(storage, `/images/${file.name}`)
  

  uploadBytes(mountainsRef, file).then((snapshot) => {
    // console.log('Uploaded a blob or file!');
  })
}


const [image, setImage] = useState()
const [imageURL, setImageURL] = useState()

const fileReader = new FileReader();
fileReader.onloadend = () => {
  setImageURL(fileReader.result)
}
const handelerSubmit = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  setImage(file)
  fileReader.readAsDataURL(file);
}

 const k = messagesData.filter(x => x[1].uid === user.uid && x[1].PeopleBase===null)
  const k2 = k.map(x=>x[0])
    
    const sendMessage = async (e) => {
      
      const add = doc(firestore, 'PeopleBase', `${k2}`)
      try {
        const docRef = await updateDoc(add, {
          PeopleBase:{
            nameUser: nameUser,
            surnamUser: surnamUser,
            numberUser: numberUser,
            workUser: workUser,
            statusUser: statusUser,
            imageURL: imageURL,
          }      
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setValue("");
    setValue1("");
    setValue2("");
    setValue3("");
    setValue4("");
    handleAddFormHide()
    getMessages()
  };

  const allSendMes = () => {
    sendMessage()
    handleAddFormHide()
    handleEditFormHide()
  }

  return (
      <>
      <Container>
          <form key={uid}>
            <div className="img">
              <input type="file"
              onChange={handelerSubmit}>            
              </input>
            </div>
            </form>
            <div className="ProfilText">
            <div>
            <h5>Имя</h5>
            <Form.Control
            value={nameUser}
            variant={"outlined"}
            onChange={e => setValue(e.target.value)}/>
            </div>
            <div>
            <h5>Фамилия</h5>
            <Form.Control
            value={surnamUser}
            variant={"outlined"}
            onChange={e => setValue1(e.target.value)}/>
            </div>
            <div>
            <h5>Номер</h5>
            <Form.Control
            value={numberUser}
            variant={"outlined"}
            onChange={e => setValue2(e.target.value)}/>
            </div>
            <div>
            <h5>Работа</h5>
            <Form.Control
            value={workUser}
            variant={"outlined"}
            onChange={e => setValue3(e.target.value)}/>
            </div>
            <div>
            <h5>Статус</h5>
            <Form.Control
            value={statusUser}
            variant={"outlined"}
            onChange={e => setValue4(e.target.value)}/>
            </div>
            
            <Button onClick={allSendMes} variant={"outlined"}>Отправить</Button>
            </div>
            </Container>
            </>
  )
}


export default PersonaInfoAdd
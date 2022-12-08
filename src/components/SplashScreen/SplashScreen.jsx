 import "./../SplashScreen/SplashScreen.css"
 import React, { useState, useContext, useEffect } from 'react'
 import Container from 'react-bootstrap/Container';
 import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy,deleteDoc  } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../hooks/use-auth";
import { Redirect } from "react-router-dom";

 export default function SplashScreen(props) {
  const {auth, firestore} = useContext(Context)
  const [user] = useAuthState(auth)
  
  const [messagesData, setMessagesData] = useState([]);
  const [blogKey, setMessagesKey] = useState()  
  const {isAuth, emaill} = useAuth()
 
 


  const getMessages = async () => {
    const q = query(collection(firestore, "Pictures"), orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      setMessagesData([]);
      // eslint-disable-next-line array-callback-return
      querySnapshot.docs.map((doc) => {
        setMessagesData((prevState) => {
          return [...prevState, [doc.id, doc.data()]];
        });
      });
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const uploadFiles = (file) => {
    if (!file) return;
    const storage = getStorage();
    const mountainsRef  = ref(storage, image)
    
  
    uploadBytes(mountainsRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
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

 
  const createPost = async (e) =>{

    try {
        const docRef = await addDoc(collection(firestore, "Pictures"), {
            uid: user.uid,
            photoURL: imageURL,
            createdAt: Timestamp.fromDate(new Date()),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   }
 


   const deletePost = async (e) =>{
    
    const add = doc(firestore, "Pictures", `${e}`)
    
    try {
        const docRef = await deleteDoc(add);
        // console.log("Document update with ID: ", docRef);
       
    } catch (e) {
      console.error("Error adding document: ", e);
    }
   }

   


   const messagesDatas = messagesData.map((item, i)=>{
    
    if (item[1].uid === user.uid) {
      
        return(
          <div className="DeleteFlex" key={item}>
            <div className="ramka-5"><img  src={item[1].photoURL}/>
          </div>         
          <Button onClick={()=>{deletePost(item[0])}}>Delete</Button>
          </div>
          
        )}
      
})


     return isAuth ? (
   
      <><Container>
        <div className="sendCont">
          <input type="file" onChange={handelerSubmit}>                   
          </input>
          <Button onClick={createPost} >Send</Button>
        </div>
        
        <div className="SplashScreen ">

        {messagesDatas}
        
        </div>
        </Container></>
      
     ) : ( <Redirect to='/login'/>)
     
   }
 
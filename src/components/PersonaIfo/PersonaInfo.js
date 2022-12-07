import MyPage from '../MyPage'
import React, {useContext, useState, useEffect, useRef} from 'react';
import '../PersonaIfo/PersonaInfo.css'
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy , updateDoc} from "firebase/firestore";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { debugErrorMap } from 'firebase/auth';
import PersonaInfoEdit from './PersonaInfoAdd';
import { InfoBlogCard } from './InfoBlogCard';
import PersonaInfoAdd from './PersonaInfoAdd';
import PersonaInfoEdid from './PersonaInfoEdid';


const PersonaInfo = (props) => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [messagesData, setMessagesData] = useState([]); //  (withdrawBlog)
    const [keyBlog, setMessagesKey] = useState([]);
    const [editForm, showEditForm] = useState(false)
    const [formState, showAddForm] = useState(1)

    const handleAddFormShow = (formState) => {
      if (formState === 0) {
          showAddForm(formState + 1)
      } else {
          showAddForm(formState)
      }
  }

  const handleAddFormHide = (formState) => {
      if (formState === 0) {
          showAddForm(formState)
      } else {
          showAddForm(formState - 1)
      }
  }
  
  const handleEditFormShow =()=>{
      showEditForm(true)
  }
  const handleEditFormHide =()=>{
      showEditForm(false)
  }
  const getMessages = async () => {
    const q = query(collection(firestore, "PeopleBase"), orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      setMessagesData([]);
      setMessagesKey([]);
      // eslint-disable-next-line array-callback-return
      querySnapshot.docs.map((doc) => {
        setMessagesData((prevState) => {
          return [...prevState, [doc.id, doc.data()]];
        });
        setMessagesKey((prevState) => {
          return [...prevState, doc.id];
        });
      });
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

 
  const [selectPost, setPost] = useState()
  const handelSelectPost = (blogPost) =>{
    setPost(blogPost)
}


  
        const messagesDatas = messagesData.map((item, i)=>{
            if (item[1].uid === user.uid && item[1].PeopleBase!==null) {
                return(
                    <InfoBlogCard
                   
                    key={item[1].uid}
                    imageURL={item[1].PeopleBase.imageURL}
                    nameUser={item[1].PeopleBase.nameUser}
                    surnamUser={item[1].PeopleBase.surnamUser}
                    numberUser={item[1].PeopleBase.surnamUser}
                    workUser={item[1].PeopleBase.workUser}
                    statusUser={item[1].PeopleBase.statusUser}
                    handelSelectPost={()=>handelSelectPost(item)}   
                    handleAddFormShow={handleAddFormShow}
                    handleEditFormHide={handleEditFormHide}
                    handleEditFormShow={handleEditFormShow}
                    />
                )
            }
        })

        const addDatas = () => {
            if (messagesData.filter(x => x[1].uid === user.uid && x[1].PeopleBase===null).length > 0)
            return (
              <>
              {
              <PersonaInfoAdd
              
              messagesDat={messagesData}
              getMessages={getMessages}
              handleAddFormHide={handleAddFormHide}
              handleEditFormHide={handleEditFormHide}/> }
            </>
            )
            }

           

return (
    <>
    {editForm ? <PersonaInfoEdid
    selectPost={selectPost}
    messagesDat={messagesData}
    handleEditFormHide={handleEditFormHide}
    />  : addDatas()
    
    } 
    {editForm ? null : messagesDatas}  
    
    </> 
)
}
export default PersonaInfo
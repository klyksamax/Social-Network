import "../../components/ProfileInfo/EditPostForm.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import userEvent from "@testing-library/user-event";
//import { propTypes } from 'react-bootstrap/esm/Image';
import React, { useState, useContext , useEffect} from 'react';
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, getDocs, Timestamp, updateDoc, arrayUnion, serverTimestamp , doc, set , query, orderBy,onSnapshot } from "firebase/firestore";
import { update } from "firebase/database";



const EditPostForm = (props) => {
    const [postTitle, handelePostTitleChange] = useState(props.selectPost[1].title)
    const [postDiscrip, setDiscrip] = useState(props.selectPost[1].describe)
    const [blogArr, setTime] = useState(props.blogarr)
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [blogKey, setMessagesKey] = useState(props.selectPost[0])  




   const TitlChange = (e) =>{
    handelePostTitleChange(e.target.value)
   }
   const DiskChange = (e) =>{
    setDiscrip(e.target.value)
   }

   const Time = (e) =>{
    setMessagesKey(e.target.key)
   }
   
  
   const savePost = async (e) =>{
    e.preventDefault()
    const add = doc(firestore, "post", `${blogKey}`)
    
    try {
        const docRef = await updateDoc(add, {
            uid: user.uid,
            title: postTitle,
            describe: postDiscrip,
            createdAt: Timestamp.fromDate(new Date()),
        });
        // console.log("Document update with ID: ", docRef);
       
    } catch (e) {
      console.error("Error adding document: ", e);
    }
        props.handleEditFormHide()
   }

    const handleEditFormHide = props.handleEditFormHide

    return (
        <>
            <form action='' className='addPostForm' onSubmit={savePost} key={blogKey}>
                <div className='GridMyPost2' >
                    <>
                        <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                        <Form.Control as="textarea" 
                                    placeholder="Leave a comment here" 
                                    value={postTitle}
                                    onChange={TitlChange}
                                    required
                                    />
                                    
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingTextarea2" label="My Post">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '120px' }}
                                value={postDiscrip}
                                onChange={DiskChange}
                                required
                            />
                        </FloatingLabel>

                    </>
                    <div className='Button'>
                        <>
                            <Button 
                                type="submit"
                                variant="primary"
                                size="lg"
                                active>
                                Save
                            </Button>{' '}
                        </>

                    </div>
                </div>
            </form>
            <div className='overlay' onClick={handleEditFormHide}></div>
        </>
    )
}



export default EditPostForm
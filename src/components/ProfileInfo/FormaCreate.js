import "../../components/ProfileInfo/FormaCreate.css"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useContext } from 'react';
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy } from "firebase/firestore";
//import { propTypes } from 'react-bootstrap/esm/Image';



const FormaCreate = (props) => {
    const [postTitle, handelePostTitleChange] = useState('')
    const [postDiscrip, setDiscrip] = useState('')
    const [postid, setId] = useState('')
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)

    const IDChange = (e) =>{
        setId(e.docRef.id)
       }
   const TitlChange = (e) =>{
    handelePostTitleChange(e.target.value)
   }
   const DiskChange = (e) =>{
    setDiscrip(e.target.value)
   }

   

   const createPost = async (e) =>{
    e.preventDefault()
    
    try {
        const docRef = await addDoc(collection(firestore, "post"), {
            uid: user.uid,
            title: postTitle,
            describe: postDiscrip,
            createdAt: Timestamp.fromDate(new Date()),
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
        props.handleAddFormHide()
        props.getMessages()
   }

    const getMessages = props.getMessages
    const handleAddFormHide = props.handleAddFormHide


    return (
        <>
            <form action='' className='addPostForm' onSubmit={createPost}>
                <div className='GridMyPost2' key={postid}>
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
                                Send
                            </Button>{' '}
                        </>

                    </div>
                </div>
            </form>
            <div className='overlay' onClick={handleAddFormHide}></div>
        </>
    )
}


export default FormaCreate
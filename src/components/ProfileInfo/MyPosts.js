import React, { useEffect, useState, useContext } from 'react';
import "../../components/ProfileInfo/MyPosts.css"
//import FloatingLabel from 'react-bootstrap/FloatingLabel';
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormaCreate from './FormaCreate';
// import { posts } from '../shared/progectData';
import { BlogCard } from './BlogCard';
import axios from 'axios';
import EditPostForm from './EditPostForm';
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy } from "firebase/firestore";
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";



const MyPosts = (props) => {

    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [formState, showAddForm] = useState(0)
    const [blogArr, setMessagesData] = useState([])  
    const [blogKey, setMessagesKey] = useState([])  
    const [editForm, showEditForm] = useState(false)
    const [selectPost, setPost] = useState({})

    const getMessages = async () => {
        const q = query(collection(firestore, "post"));
    
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
    const handelSelectPost = (blogPost) =>{
        setPost(blogPost)
    }


    const blogPosts = blogArr.map((item, i)=>{
        if (item[1].uid === user.uid) {
        return(
            <BlogCard
            uid = {item[1].uid}
            key = {i}
            title={item[1].title}
            describe={item[1].describe}
            handleEditFormShow={handleEditFormShow}
            handelSelectPost={()=>handelSelectPost(item)}            
            />
        )
        }
        })

        // if (blogArr.length===0)
        // return <h1>Загружаю данные......</h1>

    return (
        <div className='GridMyPost'>
            <div className='Create'>
                <Button variant="secondary" size="lg" onClick={handleAddFormShow}>Create Post</Button>
            </div>
            {
                formState ? <div className='Form'><FormaCreate 
                blogArr={blogArr[1]}
                handleAddFormHide={handleAddFormHide}
                getMessages={getMessages}
                 /></div> : null
            }
            {
                editForm && (
                    <EditPostForm
                    handleEditFormHide={handleEditFormHide}
                    selectPost={selectPost}
                    blogArr={blogArr}
                    />
                )

            }

            <div className='Messages'>
                {blogPosts}
            </div>
        </div>
    )
}


export default MyPosts
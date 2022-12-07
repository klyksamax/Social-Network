import React from "react";
import Dialog from "./FriendsComponent/Dialog";
import { Redirect } from "react-router-dom";
import "../MyFrends/MyFrends.css"
import {useContext, useState, useEffect, useRef} from 'react';
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy } from "firebase/firestore";
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import "../MyFrends/FriendsComponent/Friends.css"
import {useAuth} from '../hooks/use-auth'
import Container from 'react-bootstrap/Container';


const MyFrends = (props) =>{
  const {isAuth, emaill} = useAuth();
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [messagesData, setMessagesData] = useState([]);
    const getMessages = async () => {
        const q = query(collection(firestore, "PeopleBase"), orderBy("createdAt", "asc"));
        onSnapshot(q, (querySnapshot) => {
          setMessagesData([]);
    
          // eslint-disable-next-line array-callback-return
          querySnapshot.docs.map((doc) => {
            setMessagesData((prevState) => {
              return [...prevState, doc.data()];
            });
          });
        });
      };
      useEffect(() => {
        getMessages();
      }, []);

  


  const [itemDat, createFriend] = useState()


  const [editForm, showEditForm] = useState(false)

  const handleEditFormShow =()=>{
    showEditForm(true)
}
const handleEditFormHide =()=>{
    showEditForm(false)
}

  


      
  
      const messagesDatas = messagesData.map((item, i)=>{
        if (item.PeopleBase!==null && item.uid !== user.uid) {
            return(
                <Card key={i} style={{ width: '8rem', margin: "25px",}} onClick={handleEditFormShow}>
      <Card.Img variant="top" style={{ width: '8rem'}} src={item.PeopleBase.imageURL} />
      <Card.Body>
        <Card.Title>{item.email}</Card.Title>
        <Card.Text>
          {item.PeopleBase.statusUser}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{`${item.PeopleBase.nameUser} ${item.PeopleBase.surnamUser}`}</ListGroup.Item>
      </ListGroup>
      <Card.Body className='cardBody'>
        <div>
        <Card.Link href='#`${}`' onClick={()=>{createFriend(item)}}>Отправить сообщение</Card.Link>
        </div>
        
      </Card.Body>
    </Card>
            )
        }
    })


    
 console.log(editForm)

    const contOverlay = () =>{
      return (
        <>
        {itemDat ? 
          <>
        <Container maxWidth="sm" action='' className='addPostForm'>
          
          <div className='GridMyPost2' >
        <Dialog
        key={itemDat.uid}
        itemDat={itemDat}/>
        </div>
          </Container>        
          <div className='overlay' onClick={handleEditFormHide}></div>
          </> : <></>}
          </>
      )
    }




return isAuth ? (
    <>
    <Container className="container1">
      
      <div className="box-1">
        </div>
        <div className="box-2">
        {messagesDatas}
        </div>
        {editForm ? contOverlay() : null}
        
    </Container>
    </>) : ( <Redirect to='/login'/>)



}

export default MyFrends



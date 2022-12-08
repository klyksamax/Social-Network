import "../FriendsComponent/Dialog.css"
import React, {useContext, useState, useEffect} from 'react';
import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, addDoc, Timestamp, getDocs, doc, query, onSnapshot, orderBy } from "firebase/firestore";
import {Avatar, Button, Container, Grid, TextField} from '@mui/material';
import { useSelector } from "react-redux";

const Dialog = (props) =>{
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')

    const [messagesData, setMessagesData] = useState([]);

    

    const itemUid = props.itemDat.uid
    const photoURL = props.itemDat.PeopleBase.imageURL
    const displayName = props.itemDat.PeopleBase.nameUser
    
   
    const getMessages = async () => {
        const q = query(collection(firestore, "messages"), orderBy("createdAt", "asc"));
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
    
    
        
        const sendMessage = async () =>{
    
          try {
              const docRef = await addDoc(collection(firestore, "messages"), {
                uid: user.uid,
                displayName: displayName,
                photoURL: photoURL,
                text: value,
                FriendsUid: itemUid,
                createdAt: Timestamp.fromDate(new Date()),
                email: user.email
              });
              console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
         }


const messagesDatas = messagesData.map((item, i)=>{
 
  if (user.uid===item.FriendsUid && itemUid===item.uid){
    return (
      <div
      key={i}
       style={{
        margin: 10,
        border: item.FriendsUid === item.uid ? '2px solid green' : '2px dashed red',
        marginLeft: item.FriendsUid === item.uid ? 'auto' : '10px',
        width: 'fit-content',
        padding: 5,
    }}>
        <Grid container>
            <Avatar src={photoURL}/>
            <div>{displayName}</div>
        </Grid>
        <div>{item.text}</div>
    </div>
    )
  } else if (itemUid===item.FriendsUid && user.uid===item.uid)
   return(<div
    key={i}
    style={{
    margin: 10,
    border: item.FriendsUid !== item.uid ? '2px solid green' : '2px dashed red',
    marginLeft: item.FriendsUid !== item.uid ? 'auto' : '10px',
    width: 'fit-content',
    padding: 5,
}}>
    <Grid container>
        <Avatar src={photoURL}/>
        <div>{displayName}</div>
    </Grid>
    <div>{item.text}</div>
</div>)
  
})


return (
<>
            <Grid container
                  alignitems={"center"}
                  style={{height: "auto", marginTop: 20, }}>
                <div style={{width: '100%', height: '430px', border: '1px solid gray', overflowY: 'auto'}}>
                    {messagesDatas}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"stretch"}
                    style={{width: '100%'}}
                >
                    <TextField
                        fullWidth
                        rowsmax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Send {props.itemUid}</Button>
                </Grid>
            </Grid>
        </>
)


}

export default Dialog
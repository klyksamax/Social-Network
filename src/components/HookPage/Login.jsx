import { Formm } from "./Form"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import { setUser } from "../../store/slices/usersSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from 'react';


const Login = (props) =>{
    const dispatch = useDispatch();
    const {push} = useHistory();
   

    const handelLogin = (email, password)=>{
        const auth = getAuth();
        
        
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken
            }));
          
            push('/')
          

        })
        .catch(console.error)
    }

    return (
        <Formm 
        title="sign in"
        handleClick={handelLogin}
        />
    )
    
}

export {Login}
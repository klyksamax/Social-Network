import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { Formm } from "./Form"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/slices/usersSlice";
import React, { useContext } from 'react';
import {Context} from '../../index'
import {useAuthState} from "react-firebase-hooks/auth";
import {collection, addDoc, Timestamp,} from "firebase/firestore";

 const SignUp = () => {

    const dispatch = useDispatch();
    const {push} = useHistory();
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    

    const handelRegister = (email, password)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken,
            }));
            addDoc(collection(firestore, "PeopleBase"), {
                uid: user.uid,
                email: user.email,
                PeopleBase: null,
                createdAt: Timestamp.fromDate(new Date()),

                        });
            push('/')
        })
        .catch(console.error)

    }


    return (
        <Formm
            title={"register"}
            handleClick={handelRegister}
        />
    )
 }
export {SignUp}
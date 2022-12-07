import { useEffect, useState , useContext} from "react";
import { Redirect } from "react-router-dom";
import '../css/MyPage.css';
import imageSlide from "./MyPageData";
import MyPosts from "./ProfileInfo/MyPosts";
import PersonaInfo from "./PersonaIfo/PersonaInfo";
import {useAuth} from './hooks/use-auth'
import {Context} from '../index'
import {useAuthState} from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';

const MyPage = (props) => {
    const {isAuth, emaill} = useAuth();
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [currentState, setCurrentState] = useState(0)
    const dispatch = useDispatch();


    const sum = (a,b) =>{
        return (a+b)
    }
    console.log(sum(100000,2))

    useEffect(() => {
        
        const timer = setTimeout(() => {
            if (currentState === 2) {
                setCurrentState(0)
            } else {
                setCurrentState(currentState + 1)
            }
        }, 2000)
        return () => clearTimeout(timer);
    }, [])
    const bgImageStyle = {
        backgroundImage: `url(${imageSlide[currentState].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',

    }
    const goToNext = (currentState) => {
        setCurrentState(currentState)
    }

    
   
    return isAuth ? (
        <>
        <Container>
        
            <Container className="GridAvatar">
                <PersonaInfo/>          
            </Container>
            
            <div className="GridPicture" style={bgImageStyle}>
                <div className="Slide">
                    <div className="carousel-boullt">
                        {
                            imageSlide.map((imageSlide, currentState) => (
                                <span key={currentState} onClick={() => goToNext(currentState)}></span>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="PostMessages">
                <MyPosts />
            </div>
           
        </Container>
       
        </>

    ) : ( <Redirect to='/login'/>)
        
                
    
}



export default MyPage;
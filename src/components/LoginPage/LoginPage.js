import "../LoginPage/LoginPage.css"
import { Link } from 'react-router-dom';
import { Login } from '../HookPage/Login';
import React from 'react';
import Container from 'react-bootstrap/Container';

const LoginPage = (props) =>{

    return (
      <>
      <Container>
      <div className='Eblema' ><img src='https://decalshouse.co.uk/11181-home_default/naruto-akatsuki-cloud-emblem-vinyl-decal-sticker.jpg'/>
      </div>
      <Container>
      <div className="ramka-1">
      <div className='index1'>
      <div className='GridRamka' >
      <div className='GridLoginPage' >
      <Login />
      <p>Or <Link to='/register' >register</Link></p>
      </div>
      </div>
      </div>
      
      </div>
      </Container>
      </Container>
      </>
        
    )
}

export default LoginPage
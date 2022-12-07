import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import React from 'react';
// import { ROUTES } from './router';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
// import {Context} from "./index";
// import {useAuthState} from 'react-firebase-hooks/auth'
import MyPage from './components/MyPage';
import MyFrends from './components/MyFrends/MyFrends';
import Container from 'react-bootstrap/Container';
import './index.css'
import SplashScreen from './components/SplashScreen/SplashScreen';

function App() {
  // const {auth, firestore} = useContext(Context)
  // const [user, loading, error] = useAuthState(auth)
  
  return(
    <Container >
      
     
      
      <div className='AppGrid'>
      <Router>
      <AppNavbar/>
     
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route  path="/home"  component={MyPage}/>
          <Route  path="/login"  component={LoginPage}/>
          <Route  path="/register"  component={RegisterPage}/>
          <Route path="/friends"  component={MyFrends}/>
          <Route path="/screen"  component={SplashScreen}/>
        </Switch>
      </Router>

      </div>
      
    </Container>
  );
}

export default App;
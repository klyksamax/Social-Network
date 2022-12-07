import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from "react-redux";
import { removeUser} from "../store/slices/usersSlice";
import { useAuth } from "./hooks/use-auth";
// import { useContext} from "react";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
// import {Context} from "../index";
// import {useAuthState} from 'react-firebase-hooks/auth'
// import { useReducer } from "react";
// import { useHistory } from "react-router-dom";
import './../index.css'


export const AppNavbar =() => {
  const {isAuth, email} = useAuth();
  const dispatch = useDispatch();
  // const {auth} = useContext(Context)
  // const [user, loading, error] = useAuthState(auth)
  // const {push} = useHistory();
  // <Nav.Link  as={Link} to="/home">Home</Nav.Link>



        return (
          <>
{isAuth ? 
  
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">   
<Container>
<Navbar.Brand as={Link}  to="/home" >Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link as={Link}  to="/friends" >My Frends</Nav.Link>
      <Nav.Link as={Link}  to="/screen">My Pictures</Nav.Link>
      <NavDropdown title="Other" id="collasible-nav-dropdown">
        <NavDropdown.Item  to="#action/3.1">Music</NavDropdown.Item>
        <NavDropdown.Item  to="#action/3.1">Music</NavDropdown.Item>
        <NavDropdown.Item to="#action/3.2">Video</NavDropdown.Item>
        <NavDropdown.Item to="#action/3.3">News</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item to="#action/3.4">Games</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link as={Link} to="/login" onClick={()=>dispatch(removeUser())}>Выйти {email}</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container> 
</Navbar> : 
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">   
<Container>
  <Navbar.Collapse className="meAuto"  id="responsive-navbar-nav">
    <Nav>
      <Nav.Link>Привет незнакомец</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container> 
</Navbar> }
</>
 )
}

export default AppNavbar;




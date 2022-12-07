import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Formm = ({title, handleClick}) =>{
    const [email, setEmail] = useState('')
    const [pass, setPas] = useState('')

    return (
        <div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        required
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        required
        value={pass}
        onChange={(e)=> setPas(e.target.value)}
        />
      </Form.Group>
      
      <Button variant="primary" type="submit" 
      onClick={()=>handleClick(email, pass)}>
        {title}
      </Button>
        </div>
        
    )
}

export {Formm}
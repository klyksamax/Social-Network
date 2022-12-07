import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { SignUp } from '../HookPage/SignUp';

const RegisterPage = (props) =>{

   

  return (
      <>
      <div className='Eblema' ><img src='https://decalshouse.co.uk/11181-home_default/naruto-akatsuki-cloud-emblem-vinyl-decal-sticker.jpg'/></div>
      <div className='GridRamka' >
          
      <div className='GridLoginPage' >
      <SignUp/>
    <p>Already have an account& <Link to='/login'>register</Link></p>
  </div>
  </div>
  </>
  )
}

export default RegisterPage
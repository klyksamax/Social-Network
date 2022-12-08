import React from "react";
import Button from 'react-bootstrap/Button';
import "./PersonaInfo.css"
import Container from 'react-bootstrap/Container';
export const InfoBlogCard = ({
imageURL,
nameUser,
surnamUser,
numberUser,
workUser,
statusUser,
handelSelectPost,
handleEditFormShow,
handleAddFormShow,
handleEditFormHide,
uid
}) => {

  

  const showEditForm = ()=>{
    handelSelectPost();
    handleAddFormShow();
    handleEditFormHide();
    handleEditFormShow();
  }
 

    return(
        
        <Container key={uid}>
        <Container  className="img" >  
    <img src={imageURL} />
    <div className="ButtonLeft" >
    <Button  variant="dark" onClick={showEditForm}>Change profile</Button >
    </div>
        </Container>
<Container  className="ProfilText" >
    <div >
        <h5>{nameUser}</h5>  
    </div>
    <div >
        <h5>{surnamUser}</h5>
    </div>
    <div >
        <h5>{numberUser}</h5>  
    </div>
    <div >
        <h5>{workUser}</h5>  
    </div>
    <div >
        <h5>{statusUser}</h5>
    </div>                     
</Container>

</Container>

        )
}
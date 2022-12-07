import Accordion from 'react-bootstrap/Accordion';
import "../../components/ProfileInfo/BlogCard.css"
import Container from 'react-bootstrap/Container';

export const BlogCard = ({
key,
uid,
title,
describe,
handleEditFormShow,
handelSelectPost,
writeUserData,
}) =>{

  const showEditForm = ()=>{
    handelSelectPost();
    handleEditFormShow();
    //writeUserData();
  }

    return(
      <Container>
      <div className='BlogCard'>
        <div className='GridH'>
          <h2 key={key}>{title}</h2>
          <button onClick={showEditForm}>
              <img src='https://img.icons8.com/ios/500/edit--v2.png' />
          </button>
        </div>
           <h5>{describe}</h5>
        </div>
        </Container>
        )
}
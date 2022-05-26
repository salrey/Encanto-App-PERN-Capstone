import React from 'react';
import FoodForm from "../Components/FoodForm";
import Footer from '../Components/Footer';

import Container from '@mui/material/Container';



const Index = ({currentUser, setCurrentUser}) => {

  return (
    <div style={{backgroundColor:"#AE6D4F"}}>
      <Container maxWidth="xs">
          <FoodForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          <Footer />
      </Container>
    </div>
  );
}

export default Index;


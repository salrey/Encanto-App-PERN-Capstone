import React from 'react';
import FoodForm from "../Components/FoodForm";
import Footer from '../Components/Footer';

import Container from '@mui/material/Container';



const Index = ({currentUser}) => {

  return (
    // <div style={{backgroundColor:"#AE6D4F"}}>
    <div>
      <Container maxWidth="xs">
          <FoodForm currentUser={currentUser}/>
          <Footer />
      </Container>
    </div>
  );
}

export default Index;


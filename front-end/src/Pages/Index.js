import React from 'react';
import FoodForm from "../Components/FoodForm";
import Footer from '../Components/Footer';


const Index = ({currentUser}) => {

  return (
    <div>
        <FoodForm currentUser={currentUser}/>
        <Footer />
    </div>
  );
}

export default Index;


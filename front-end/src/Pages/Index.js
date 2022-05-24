import React from 'react';
import Users from "../Components/Users";
import FoodForm from "../Components/FoodForm";
import { useState } from "react";
import Footer from '../Components/Footer';


const Index = ({currentUser}) => {
  //useState at the Index level to capture updates on food preferences
  // const [currentFoodPref, setFoodPref] = useState()

  return (
    <div>
        {/* <Users food_pref={currentFoodPref} currentUser={currentUser}/> */}
        <FoodForm currentUser={currentUser}/>
        <Footer />
    </div>
  );
}

export default Index;


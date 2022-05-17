import React from 'react';
import Users from "../Components/Users";
import FoodForm from "../Components/FoodForm";
import { useState } from "react";


const Index = ({currentUser}) => {
  //useState at the Index level to capture updates on food preferences
  const [currentFoodPref, setFoodPref] = useState()

  return (
    <div>
        <Users food_pref={currentFoodPref}/>
        <FoodForm callBackFood={setFoodPref} currentUser={currentUser}/>
    </div>
  );
}

export default Index;


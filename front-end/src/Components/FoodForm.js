import React from 'react';
import { useState } from "react";
import axios from "axios";

const FoodForm = ({callBackFood}) => {
    const API = process.env.REACT_APP_API_URL;
    
    //TESTING: PLACEHOLDER INFO
    const [ user, setUser ] = useState({
      id: 3,
      name: "Rachel",
      email: "rachel@gmail.com",
      food_pref: "japanese"
    });

    //MISSING INFO
    //Get current users payload based on login/sign up information and then set the user state in order to edit that


    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value});
    };


    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${API}/users/${user.id}`, user);
        callBackFood(user.food_pref)
    };

    return (
    <form onSubmit={handleEdit}>
        <label htmlFor="food_pref"> Choose food preference:</label>        
        <select name="food_pref" id="food_pref" onChange={handleInputChange}>
            <option value="american">American</option>
            <option value="mexican">Mexican</option>
            <option value="japanese">Japanese</option>
            <option value="peruvian">Peruvian</option>
            <option value="korean">Korean</option>
        </select>
        <button type="submit">Submit</button>
    </form>
    );
}

export default FoodForm;

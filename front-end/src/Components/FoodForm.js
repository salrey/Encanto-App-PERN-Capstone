import React from 'react';
import { useState } from "react";
import axios from "axios";

const FoodForm = ({callBackFood, currentUser}) => {
    const API = process.env.REACT_APP_API_URL;
    
    const [ user, setUser ] = useState(currentUser);

    // console.log("foodform: ", user)

    const handleInputChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value});
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${API}/users/${user.id}`, user);
        callBackFood(user.food_pref)
    };

    const preferences = [
        "American",
        "Mexican",
        "Japanese",
        "French",
        "Korean",
        "Chinese",
        "Peruvian",
        "Vegan",
        "English",
        "Italian",
        "Caribbean"
    ]

    const dropdown = 
        <select name="food_pref" id="food_pref" onChange={handleInputChange}> 
            <option value="">---select---</option>
            {preferences.map((cuisine) => 
            user && user.food_pref === cuisine.toLowerCase() ? 
                <option value={cuisine.toLowerCase()} selected>{cuisine}</option> : 
                <option value={cuisine.toLowerCase()}>{cuisine}</option>)}
        </select>

    return (
    <form onSubmit={handleEdit}>
        <label htmlFor="food_pref"> Choose food preference:</label>  
        {dropdown}      
        <button type="submit">Submit</button>
    </form>
    );
}

export default FoodForm;

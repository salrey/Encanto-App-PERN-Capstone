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

    return (
    <form onSubmit={handleEdit}>
        <label htmlFor="food_pref"> Choose food preference:</label>        
        <select name="food_pref" id="food_pref" onChange={handleInputChange}>
            <option value="">---select---</option>
            <option value="american">American</option>
            <option value="mexican">Mexican</option>
            <option value="japanese">Japanese</option>
            <option value="french">French</option>
            <option value="korean">Korean</option>
            <option value="chinese">Chinese</option>
            <option value="peruvian">Peruvian</option>
            <option value="vegan">Vegan</option>
            <option value="english">English</option>
            <option value="italian">Italian</option>
            <option value="caribbean">Caribbean</option>
        </select>
        <button type="submit">Submit</button>
    </form>
    );
}

export default FoodForm;

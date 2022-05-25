import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';


const FoodForm = ({ currentUser }) => {
    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [ user, setUser ] = useState(currentUser);
    const [ users, setUsers ] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users?food_pref=${user.food_pref}`);
                // console.log("response data", res.data)
                if (res.data.payload.length !== 1 && res.data.payload[0].id !== currentUser.id) {
                    setUsers(res.data.payload.filter((user) => user.email !== currentUser.email))
                }
            } catch (err) {
                console.warn(err)
            }
        }
        fetchData();
    }, [API, user.food_pref, currentUser.id, currentUser.email])



    const handleInputChange = (event) => {
        setUser({ ...user, food_pref: event.value});
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${API}/users/${user.id}`, user);
        if (users) {
            navigate(`/users/${users[0].id}`, {state: {currentUser: user, users: users}})
        } else {
            window.alert("No users found at this time. Try again later or select another type of food.")
        }
    };

    const options = [
        { value: "", label: "---select---" },
        { value: "american", label: "American"},
        { value: "caribbean", label: "Caribbean"},
        { value: "chinese", label: "Chinese"},
        { value: "english", label: "English"},
        { value: "french", label: "French"},
        { value: "italian", label: "Italian"},
        { value: "japanese", label: "Japanese"},
        { value: "korean", label: "Korean"},
        { value: "mexican", label: "Mexican"},
        { value: "peruvian", label: "Peruvian"},
        { value: "vegan", label: "Vegan"}
    ];
    
    const dropdown = 
    <Select
        name="food_pref"
        id="food_pref"
        value={options.value}
        options={options}
        defaultValue={options.find((cuisine) => user.food_pref === cuisine.value)}
        onChange={handleInputChange}
    />

    return (
    <form onSubmit={handleEdit}>
        <label htmlFor="food_pref"> What are you craving? </label>  
        {dropdown}      
        <button type="submit">Submit</button>
    </form>
    );
}

export default FoodForm;

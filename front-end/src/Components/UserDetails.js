import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${API}/users/${id}`)
        .then((response) => setUser(response.data.payload))
        .catch(() => { navigate("/not-found")})
    }, [API, id, navigate])


    const handleIndex = () => {
        return navigate("/users");
    }

    return (
        <>
            <div onClick={handleIndex}> Back </div>
            <div> 
                User Details 
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>
        </>
        
    );
}

export default UserDetails;
  

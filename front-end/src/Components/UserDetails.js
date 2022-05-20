import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const UserDetails = () => {
    const location = useLocation();
    const {currentUser} = location.state;
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users/${id}`)
                res.data.payload.email && setUser(res.data.payload)
            } catch (err) {
                console.warn(err)
                return navigate("/not-found")
            }
        }    
        fetchData();    
    }, [API, id, navigate])

    const handleSwipe = async (event) => {
        console.log(currentUser)
        event.preventDefault();
        const submitted = event.nativeEvent.submitter.innerText
        if (submitted === "No") {
            //"request_status? send -1 if request already exists or set up a separate block list"
            //then navigate to next user
        } else {
            //before creating request, need to check if request was sent to current user and if it exists, then change request status to accept and notify user it's a match!
            await axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: user.id})
            //otherwise, navigate to next user
        }
    }
    
    return (
        <>
            <Link to={"/users"}> Back </Link>
            <div> 
                User Details 
                <div>{user.name}</div>
                <div>{user.email}</div>
            </div>
            <form onSubmit={handleSwipe}>
                <button id="request_status" name="request_status" type="submit">No</button>
                <button id="request_status" name="request_status" type="submit">Yes</button>
            </form>
        </>
        
    );
}

export default UserDetails;
  

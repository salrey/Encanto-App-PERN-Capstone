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
    const [matchState, setMatchState] = useState();
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
            try {
                //check if any requests exist for this currentUser
                const match= await axios.get(`${API}/match-requests`, {request_to: currentUser.id, request_from: user.id})
                //if so, then delete that request
                setMatchState(match)
                axios.delete(`${API}/match-requests`, {id: match.id})
            } catch (err) {
                //if there are no requests, then navigate to next user
            }
        } else {
            try {
              //check if any requests exist for this currentUser
              const match = await axios.get(`${API}/match-requests`, {request_to: currentUser.id, request_from: user.id})
              //PUT to change request_status 
              setMatchState({...matchState, request_status: 1})
              axios.put(`${API}/match-requests`, {match: matchState, match_id: match.id})
              window.alert("Delighted to meet! Let's eat")
            } catch (err) {
                //if no existing request, then create a new one
                await axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: user.id})
                //then navigate to next user
            }
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
  

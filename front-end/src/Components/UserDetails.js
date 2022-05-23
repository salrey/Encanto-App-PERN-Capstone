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
    const [currentUserRequest, setCurrentUserRequest] = useState({
        request_to: "",
        request_from: ""
    });
    const API = process.env.REACT_APP_API_URL;

    console.log([].name)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users/${id}`)
                setUser(res.data.payload)
            } catch (err) {
                console.warn(err)
                return navigate("/not-found")
            }
        }    
        fetchData();    
    }, [API, id, navigate])

    const handleSwipe = (event) => {
        event.preventDefault();
        const submitted = event.nativeEvent.submitter.innerText
        const requestToCurrentUser = async () => {
            try {
                const res = await axios.get(`${API}/match-requests?request_to=${currentUser.id}&request_from=${user.id}`)
                setCurrentUserRequest({...currentUserRequest, request_to: res.data.payload})
            } catch (error) {
                return error
            }
        }
        requestToCurrentUser();

        const requestFromCurrentUser = async () => {
            try {
                const res = await axios.get(`${API}/match-requests?request_to=${user.id}&request_from=${currentUser.id}`)
                setCurrentUserRequest({...currentUserRequest, request_from: res.data.payload})
            } catch (error) {
                return error
            }
        }
        requestFromCurrentUser();
    
        console.log("Any matches?", currentUserRequest)

        const insertDate = () => {
            const date = new Date();
    
            const [month, day, year, hour, minutes] = [
                date.getMonth(),
                date.getDate(),
                date.getFullYear(),
                date.getHours(),
                date.getMinutes(),
              ];

              return `${month}/${day}/${year} ${hour}: ${minutes}`
            
        }


        //need to also consider that if this currentUser also sent that user a request, then changes their mind, so when they say no after saying yes, we are deleting that request 
        // console.log(fetchData())
        //if response.data.success is false, then no match_requests exist 
        // if (submitted === "No") {
        //     try {
        //         //check if any requests exist for this currentUser
        //         const match = await axios.get(`${API}/match-requests?request_to=${currentUser.id}&request_from=${user.id}`)
        //         //if so, then delete that request
        //         if (match.data.payload.request_to) {
        //             axios.delete(`${API}/match-requests?id=${match.data.payload.id}`)
        //         }
        //     } catch (err) {
        //         //if there are no requests, then navigate to next user
        //         return err
        //     }
        // } else {
        //     try {
        //         //check if any requests exist for this currentUser
        //         const match = await axios.get(`${API}/match-requests?request_to=${currentUser.id}&request_from=${user.id}`)
        //         if (match.data.payload.request_to) {
        //             axios.put(`${API}/match-requests`, {match: {...match.data.payload, request_status: 1, date_accepted: insertDate()}, match_id: match.data.payload.id})
        //             window.alert("Delighted to meet! Let's eat")
        //             //then navigate to chat 
        //         } 
        //     } catch (err) {
        //         console.warn(err)
        //         //if no existing request, then create a new one
        //         axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: user.id})
        //         //then navigate to next user
        //     }
        // }
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
  

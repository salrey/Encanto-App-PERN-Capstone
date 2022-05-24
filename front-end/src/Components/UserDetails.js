import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

const UserDetails = () => {
    const location = useLocation();
    const { currentUser, users } = location.state;
    const navigate = useNavigate()
    // const { id } = useParams();
    // const [user, setUser] = useState([]);
    const [matchRequest, setMatchRequest] = useState()
    // const [ userId, setUserId ] = useState(users[index].id);
    const [ index, setIndex ] = useState(0);
    const API = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get(`${API}/users/${userId}`)
    //             setUser(res.data.payload)
    //         } catch (err) {
    //             console.warn(err)
    //             return navigate("/not-found")
    //         }
    //     }    
    //     fetchData();  
    // }, [API, userId, navigate])
    
    useEffect(() => {
        const fetchMatchRequests = async () => {
            try {
                const res = await axios.get(`${API}/match-requests?request_to=${currentUser.id}&request_from=${users[index].id}`) 
                setMatchRequest(res.data.payload)
            } catch (err) {
            }

            try {
                const res = await axios.get(`${API}/match-requests?request_to=${users[index].id}&request_from=${currentUser.id}`)
                setMatchRequest(res.data.payload)
            } catch (err) {
            }
        }
        fetchMatchRequests();
    }, [API, currentUser.id, users[index].id])

    const handleSwipe = (event) => {
        event.preventDefault();
        const submitted = event.nativeEvent.submitter.innerText
    
        const insertDate = () => {
            const date = new Date();
    
            const [month, day, year, hour, minutes] = [
                date.getMonth(),
                date.getDate(),
                date.getFullYear(),
                date.getHours(),
                date.getMinutes(),
            ];

            return `${month+1}/${day}/${year} ${hour}:${minutes}`
        }

        if (submitted === "No") {
            console.log(matchRequest)
            if (matchRequest?.request_to || matchRequest?.request_from) {
                axios.delete(`${API}/match-requests?id=${matchRequest.id}`)
                setMatchRequest();
                //then navigate to next user
                const i = index + 1;
                setIndex(i);
                // setUserId(users[i].id);
            } else {
                //if there are no requests, then navigate to next user
                const i = index + 1;
                setIndex(i);
                // setUserId(users[i].id);
            }
        } else {
            if (matchRequest?.request_to) {
                console.log(matchRequest)
                const update = axios.put(`${API}/match-requests`, {match: {...matchRequest, request_status: 1, date_accepted: insertDate()}, match_id: matchRequest.id})
                setMatchRequest(update.data.payload)
                window.alert("Delighted to meet! Let's eat")
                //then navigate to chat 
            } else if (matchRequest?.request_from) {
                //navigate to next user
                const i = index + 1;
                setIndex(i);
                // setUserId(users[i].id);
            } else {
                const newRequest = axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: users[index].id})
                setMatchRequest(newRequest.data.payload);
                //then navigate to next user
                const i = index + 1;
                setIndex(i);
                // setUserId(users[i].id);
            }
        }
    }
    
    return (
        <>
            <Link to={"/users"}> Back </Link>
            <div> 
                User Details 
                <div>{users[index].name}</div>
                <div>{users[index].email}</div>
            </div>
            <form onSubmit={handleSwipe}>
                <button id="request_status" name="request_status" type="submit">No</button>
                <button id="request_status" name="request_status" type="submit">Yes</button>
            </form>
        </>
        
    );
}

export default UserDetails;
  

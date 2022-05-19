import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users/${id}`)
                // setUser(res.data.payload)
                res.data.payload.email && setUser(res.data.payload)
            } catch (err) {
                console.warn(err)
                return navigate("/not-found")
            }
        }    
        fetchData();    
    }, [API, id, navigate])

    const handleSwipe = (event) => {
        event.preventDefault();
        console.log(event.nativeEvent.submitter.innerText) //> to determine which button was submitted 
        const submitted = event.nativeEvent.submitter.innerText
        if (submitted === "No") {
            console.log("request_status? send -1")
        } else {
            console.log("request_status? send 1")
        }
        //IF YES
        //posting a match request 
            //request_from => VARCHAR(255) NOT NULL / currentUser id (pass as prop)
            //request_to => VARCHAR(255) NOT NULL / id from user state/useParams to get specific user_id 
            //match_request_sender => VARCHAR(255) NOT NULL / sender name
            //match_request_receiver => VARCHAR(255) NOT NULL / receiver name
            //request_status => INT NOT NULL / 0 for pending (default) 
            //date_created => DATETIME NULL DEFAULT CURRENT_TIMESTAMP of insertion
            //date_accepted => DATETIME NULL
        // Have the button id/name be request_status
        // Update state of matches list once other user responds and accepts 
            //query that selects all match requests where the status is accepted
        //When showing /users, make sure to only exclude those users who have either accepted or declined request statuses (meaning leave pending users in the list)

        //IF NO
        //Go to next user
            //Update the /users state and remove that user and setUsers 
            //consider using queues - 
            //Show the following user based on users state 
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
  

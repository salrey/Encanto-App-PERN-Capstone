import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '../Assets/avatar2.jpg'
import { Typography, Stack } from "@mui/material";
import Back from '../Assets/Back.png';



const UserDetails = () => {
    const location = useLocation();
    const { currentUser, users } = location.state;
    const navigate = useNavigate()
    const [matchRequest, setMatchRequest] = useState([])
    const [ index, setIndex ] = useState(0);
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchRequestFromCurrentUser = async () => {
            await axios.get(`${API}/match-requests?request_to=${users[index].id}&request_from=${currentUser.id}`)
                .then((res) => res.data.success && setMatchRequest(res.data.payload) )
                .catch(console.warn)
        }
        fetchRequestFromCurrentUser();
        
        const fetchRequestToCurrentUser = async () => {
            await axios.get(`${API}/match-requests?request_to=${currentUser.id}&request_from=${users[index].id}`)
            .then((res) => res.data.success && setMatchRequest(res.data.payload))
            .catch(console.warn)
        }
        fetchRequestToCurrentUser();

    }, [API, currentUser.id, users, index])


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
        
        const nextUser = (index, users) => {
            const i = index + 1;
            if (i <= users.length -1) {
                    setIndex(i);
            } else {
                window.alert("That's all for now! Try again later or choose another food preference.")
                navigate("/users")
            }
        }

        if (submitted === "No") {
            if (matchRequest?.request_to === currentUser.id || matchRequest?.request_from === currentUser.id) {
                axios.delete(`${API}/match-requests?id=${matchRequest.id}`)
                //then navigate to next user
                nextUser(index, users)
            } else {
                //if there are no requests, then navigate to next user
                nextUser(index, users)
            }
        } else {
            if (matchRequest?.request_to === currentUser.id && matchRequest?.request_status === 0) {
                axios.put(`${API}/match-requests`, {match: {...matchRequest, request_status: 1, date_accepted: insertDate()}, match_id: matchRequest.id})
                window.alert("Delighted to meet! Let's eat.")
                //then navigate to chat, pass the props needed to use cometChat 
                navigate("/chat")
            } else if (matchRequest?.request_from === currentUser.id) {
                //navigate to next user
                nextUser(index, users)
            } else if (matchRequest?.request_status === 1) {
                nextUser(index, users)
            } else {
                axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: users[index].id})
                //then navigate to next user
                nextUser(index, users)
            }
        }
    }



    const styles = {
        customBorderRadius: {
            borderRadius: 25
        }
    };




    return (
        <>
        <Container>
            
            <Stack>
                <Typography sx={{ mt: 2}}></Typography>
                        <Link to={'/users'}>
                            <img className="sign-up" src={Back} alt="back" style={{
                                width: '55px',
                                height: '35px',
                                position: 'absolute',
                                left:'1',
                                top: '3'
                                }}></img>
                        </Link>
            </Stack>
            <Box justifyContent="center"
                alignItems="center"
                sx={{display:"flex", width: '100%', mt: 15}}>
                <Paper style={styles.customBorderRadius} sx={{ 
                    backgroundImage: `url(${Avatar})`,
                    backgroundSize: '365px 464px',
                    width: '200%',
                    height: '60.5vh',
                    textAlign: "center"}}>
            <div>  
                <div><Typography
                sx={{
                    mt: 52,
                    textAlign: "center",
                    fontFamily: "Signika Negative",
                    fontWeight:'bold',
                    fontSize: '25px',
                    color: 'white'
                    }}
                >Name : {users[index].name}</Typography></div>
                <div><Typography sx={{
                    textAlign: "center",
                    fontFamily: "Signika Negative",
                    fontWeight:'bold',
                    fontSize: '20px',
                    color: 'white'
                }}>Email : {users[index].email}</Typography></div>
            
            {matchRequest?.request_status === 1 && <div> Great! You're already a combo. Would you like to continue your match with {users[index].name}?</div>}
            </div> 
            <form onSubmit={handleSwipe}>
                <button id="request_status" name="request_status" type="submit">No</button>
                <button id="request_status" name="request_status" type="submit">Yes</button>
            </form>
                </Paper>
            </Box>
        </Container>    
        </>
        
    );
}

export default UserDetails;


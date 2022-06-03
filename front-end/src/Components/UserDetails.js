import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography, Stack } from "@mui/material";
import Back from '../Assets/Back.png';
import Button from '@mui/material/Button';

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

        if (submitted === "NO") {
            if (matchRequest?.request_to === currentUser.id || matchRequest?.request_from === currentUser.id) {
                axios.delete(`${API}/match-requests?id=${matchRequest.id}`)
                //then navigate to next user
                nextUser(index, users)
                //reset fetched matchRequest
                setMatchRequest()
            } else {
                //if there are no requests, then navigate to next user
                nextUser(index, users)
            }
        } else {
            if (matchRequest?.request_to === currentUser.id && matchRequest?.request_status === 0) {
                axios.put(`${API}/match-requests`, {match: {...matchRequest, request_status: 1, date_accepted: insertDate()}, match_id: matchRequest.id})
                window.alert("Delighted to meet! Let's eat.")
                // Update the page with the next user's info.
                nextUser(index, users);
                //reset fetched matchRequest
                setMatchRequest()
            } else if (matchRequest?.request_from === currentUser.id) {
                //navigate to next user
                nextUser(index, users)
                //reset fetched matchRequest
                setMatchRequest()
            } else if (matchRequest?.request_status === 1) {
                nextUser(index, users)
                //reset fetched matchRequest
                setMatchRequest()
            } else {
                axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: users[index].id})
                //then navigate to next user
                nextUser(index, users)
            }
        }
    }


    const userProfile = require(`${users[index].photo}`)

    const displayCombo = matchRequest?.request_status === 1 && <div>
        <Typography 
        sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "Signika Negative",
            fontWeight:'bold',
            fontSize: '16px',
            color: 'yellow'
            }}
        >Great! You're already a combo. Continue?
        </Typography>
    </div>

    return (
        <Container sx={{ paddingLeft: 0, paddingRight: 0}}>  

            <Stack sx={{ paddingTop: 2, paddingLeft: 2}}>
                <Link to={'/users'}>
                    <img className="sign-up" src={Back} alt="back" 
                        style={{
                        width: '55px',
                        height: '35px',
                        position: 'absolute',
                        left:'1',
                        top: '3'
                        }}
                    />
                </Link>
            </Stack>

            <Box justifyContent="center"
                alignItems="center"
                sx={{display:"flex", width: '100%', mt: 9, paddingBottom: 30}}>

                <Paper sx={{ 
                    backgroundImage: `url(${userProfile})`,
                    backgroundColor: "inherit",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    width: '100%',
                    height: '60.5vh',
                    textAlign: "center",
                    backgroundRepeat: 'no-repeat',
                    boxShadow: 'none',
                    }}>
                    <div>  
                        <div>
                            <Typography
                                sx={{
                                mt: 55,
                                ml: 5,
                                textAlign: "left",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '28px',
                                color: 'white',
                                bgcolor: 'gray'
                                }}
                                >{users[index].name},
                            </Typography>
                        </div>
                        <div>
                            <Typography 
                                sx={{
                                ml: 5,
                                textAlign: "left",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '23px',
                                color: 'white'
                                }}
                                >{users[index].email}
                            </Typography>
                        </div>
                        {matchRequest?.request_status === 1 && displayCombo}                    
                    </div> 
                    <form onSubmit={handleSwipe}>
                        <Button id="request_status" name="request_status" type="submit" 
                            sx={{
                            border: '3px solid red',
                            borderRadius: '45%',
                            mr: 11,
                            mt: 2,
                            color: 'white',
                            fontWeight:'bold',
                            }}
                            >No
                        </Button>
                        <Button id="request_status" name="request_status" type="submit" 
                            sx={{
                            border: '3px solid green',
                            borderRadius: '45%',
                            mt: 2,
                            color: 'white',
                            fontWeight:'bold',
                            }}
                            >Yes
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container> 
    );
}

export default UserDetails;


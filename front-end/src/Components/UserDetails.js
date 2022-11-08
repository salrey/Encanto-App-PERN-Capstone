import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Import MUI
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography, Stack } from "@mui/material";
import Back from '../Assets/white-back.png';
import Fab from '@mui/material/Fab';
import NoMeals from '../Assets/no-food.png';
import Restaurant from '../Assets/yes-food.png';

//Import dummy data
import info from '../Info/model'

//Import helper functions
import RequestPopover from '../Utilities/Popover'

const UserDetails = () => {
    const location = useLocation();
    const { currentUser, users } = location.state;
    const navigate = useNavigate()
    const [matchRequest, setMatchRequest] = useState([])
    const [ index, setIndex ] = useState(0);
    const [anchorEl, setAnchorEl] = useState(false);

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
                // window.alert("That's all for now! Try again later or choose another food preference.")
                setAnchorEl(!anchorEl);
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
                // window.alert("Delighted to meet! Let's eat.")
                // Update the page with the next user's info.
                setAnchorEl(!anchorEl);
                nextUser(index, users);
                //reset fetched matchRequest
                setMatchRequest()
            } else if (matchRequest?.request_from === currentUser.id) {
                setAnchorEl(!anchorEl);
                //navigate to next user
                nextUser(index, users)
                //reset fetched matchRequest
                setMatchRequest()
            } else if (matchRequest?.request_status === 1) {
                setAnchorEl(!anchorEl);
                nextUser(index, users)
                //reset fetched matchRequest
                setMatchRequest()
            } else {
                setAnchorEl(!anchorEl);
                axios.post(`${API}/match-requests`, {request_from: currentUser.id, request_to: users[index].id})
                //then navigate to next user
                nextUser(index, users)
            }
        }
    }

    const find = info[users[index].email] !== undefined && info[users[index].email] 

    const displayCombo = matchRequest?.request_status === 1 && <div>
        <Typography 
        sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "Signika Negative",
            fontWeight:'bold',
            fontSize: '16px',
            color: 'white'
            }}
        >Great! You're already a combo. Continue?
        </Typography>
    </div>

    
    return (
        <Container 
        maxWidth="xs"
        sx={{ 
            paddingLeft: 0, 
            paddingRight: 0, 
            
            backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/51e5a75be4b0d5c26ed1d294/1568324186106-NEKN1Q5HEHXEU9JUQC5D/bclowopacity.jpg?format=2500w")', 
            backgroundSize:"80vh"
            }}>  
            <Stack sx={{ paddingTop: 2, paddingLeft: 2}}>
                <Link to={'/users'}>
                    <img className="sign-up" src={Back} alt="back" 
                        style={{
                        width: '55px',
                        height: '35px',
                        position: 'absolute',
                        left:'1',
                        top: '3',
                        }}
                    />
                </Link>
            </Stack>
            <Box justifyContent="center"
                alignItems="center"
                sx={{display:"flex", width: '100%', mt: 5, paddingBottom: 30}}>
                <Paper sx={{ 
                    backgroundImage: `url(${users[index].photo})`,
                    backgroundColor: "inherit",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    width: '100%',
                    height: '75vh',
                    textAlign: "center",
                    backgroundRepeat: 'no-repeat',
                    boxShadow: 'none',
                    mt:5
                    }}>
                <Box 
                    sx={{
                    backgroundColor:"rgb(0, 0, 0, 0.7)", 
                    width:"95%",
                    ml:1.2, 
                    mt:55, 
                    height:"12vh"
                    }}>
                            <Typography
                                sx={{
                                textAlign: "left",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '28px',
                                color: 'white',
                                }}
                                > {users[index].name[0].toUpperCase() + users[index].name.slice(1)} {find.age}
                            </Typography>
                            <Typography 
                                sx={{
                            
                                textAlign: "left",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '23px',
                                color: 'white'
                                }}
                                >
                                Gender: {find.gender}
                            </Typography>
                            <Typography 
                                    sx={{
                                    
                                    textAlign: "left",
                                    fontFamily: "Signika Negative",
                                    fontWeight:'bold',
                                    fontSize: '18px',
                                    color: 'white'
                                    }}
                                    >Favorite food: <q>{(find.fav_food)}</q>
                                </Typography>
                            </Box>
        
                
            
                        {matchRequest?.request_status === 1 && displayCombo}                    
                
                    <form onSubmit={handleSwipe}>
                        <Fab id="request_status" name="request_status" type="submit" sx={{
                            mr: 11,
                            mt: 5,
                            background: `url(${NoMeals}) no-repeat center center`,
                            backgroundSize: '30px'
                            }}> 
                            <div style={{opacity: 0}}>
                                No
                            </div>
                        </Fab>
                        <Fab id="request_status" name="request_status" type="submit" sx={{
                            mt: 5,
                            background: `url(${Restaurant}) no-repeat center center`,
                            backgroundSize: '30px'
                            }}> 
                            <div style={{opacity: 0}}>
                                Yes
                            </div>
                        </Fab>
                    </form>
                </Paper>
            </Box>
            {anchorEl ? <RequestPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl}/> : null}
        </Container> 
    );
}

export default UserDetails;


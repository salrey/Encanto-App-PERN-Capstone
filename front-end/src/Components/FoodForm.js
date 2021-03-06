import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import '../Styles/FoodForm.css';

import american from "../Food-assets/american.jpg";
import caribbean from "../Food-assets/caribbean.jpg";
import chinese from "../Food-assets/chinese.jpg";
import english from "../Food-assets/english.jpg";
import french from "../Food-assets/french.jpg";
import indian from "../Food-assets/indian.jpg";
import italian from "../Food-assets/italian.jpg";
import japanese from "../Food-assets/japanese.jpg";
import korean from "../Food-assets/korean.jpg";
import mexican from "../Food-assets/mexican.jpg";
import peruvian from "../Food-assets/peruvian.jpg";
import vegan from "../Food-assets/vegan.jpg";


const FoodForm = ({ currentUser, setCurrentUser }) => {
    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users?food_pref=${currentUser.food_pref}`);
                if (res.data.payload.length) {
                    setUsers(res.data.payload.filter((user) => user.email !== currentUser.email))
                }
            } catch (err) {
                console.warn(err)
            }
        }
        fetchData();
    }, [API, currentUser.food_pref, currentUser.email])

    const handleInputChange = (event) => {
        setCurrentUser({ ...currentUser, food_pref: event.target.id});
    };
    
    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${API}/users/${currentUser.id}`, currentUser);
        if (users.length) {
            navigate(`/users/${users[0].id}`, {state: {currentUser: currentUser, users: users}})
        } else {
            window.alert("No users found at this time. Try again later or select another type of food.")
        }
    };


    return (
        <div style={{height: "auto"}}>
            <Typography 
                sx={{
                fontFamily: "Signika Negative",
                fontSize: "5vh",
                letterSpacing: 1,
                fontWeight: 900,
                textShadow: "2px 0 #EFD9B0",
                textAlign:"left",
                margin:0,
                padding:0,
                paddingLeft: 5,
                paddingTop: 4,
                color: "#EFD9B0"
                }}
                >What are you 
            </Typography> 
            <Typography
            sx={{
                fontFamily: "Signika Negative",
                fontSize: "5vh",
                letterSpacing: 1,
                fontWeight: 900,
                textShadow: "2px 0 #EFD9B0",
                textAlign:"left",
                margin:0,
                padding:0,
                paddingLeft: 5,
                color: "#EFD9B0"
                }}
            >craving?
            </Typography>
        <form onSubmit={handleEdit}>
            <Grid container spacing={3} sx={{ mt:2, height:"530px", overflow:"scroll", paddingLeft: 1}}>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="american" className={currentUser.food_pref === "american" ? "selection" : "image"} src={american} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="caribbean" className={currentUser.food_pref === "caribbean" ? "selection" : "image"} src={caribbean} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="chinese" className={currentUser.food_pref === "chinese" ? "selection" : "image"} src={chinese} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="english" className={currentUser.food_pref === "english" ? "selection" : "image"} src={english} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="french" className={currentUser.food_pref === "french" ? "selection" : "image"} src={french} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="indian" className={currentUser.food_pref === "indian" ? "selection" : "image"} src={indian} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="italian" className={currentUser.food_pref === "italian" ? "selection" : "image"} src={italian} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="japanese" className={currentUser.food_pref === "japanese" ? "selection" : "image"} src={japanese} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="korean" className={currentUser.food_pref === "korean" ? "selection" : "image"} src={korean} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="mexican" className={currentUser.food_pref === "mexican" ? "selection" : "image"} src={mexican} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="peruvian" className={currentUser.food_pref === "peruvian" ? "selection" : "image"} src={peruvian} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
                <Grid item xs={6}>
                    <img onClick={handleInputChange} id="vegan" className={currentUser.food_pref === "vegan" ? "selection" : "image"} src={vegan} alt="american-food" style={{height: "141px", width: "161px"}} />
                </Grid>
            </Grid>
            <Box 
                justifyContent="center"
                alignItems="center"
                sx={{display:"flex"}}
                >   
                <Button 
                    onClick={handleEdit}
                    variant="contained" 
                    sx={{
                    bgcolor: '#1D3251',
                    width:"30vh",
                    height:"6vh",
                    borderRadius:'35px',
                    fontSize: "17px",
                    textTransform: 'none',
                    fontWeight:'bold',
                    mt:2,
                    mb:3,
                    }}
                    >
                        Submit
                </Button>
            </Box>
        </form>
    </div>
    );
}

export default FoodForm;

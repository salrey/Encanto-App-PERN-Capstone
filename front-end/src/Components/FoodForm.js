import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

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


const FoodForm = ({ currentUser }) => {
    const API = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [ user, setUser ] = useState(currentUser);
    const [ users, setUsers ] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users?food_pref=${user.food_pref}`);
                console.log("response data", res.data)
                if (res.data.payload.length !== 1 && res.data.payload[0].id !== currentUser.id) {
                    setUsers(res.data.payload.filter((user) => user.email !== currentUser.email))
                }
            } catch (err) {
                console.warn(err)
            }
        }
        fetchData();
    }, [API, user.food_pref, currentUser.id, currentUser.email])



    const handleInputChange = (event) => {
        console.log("onClick event", event)
        setUser({ ...user, food_pref: event.target.id});
    };
    console.log("currentUser food_pref", user.food_pref)

    console.log("users (testing): ", users)
    const handleEdit = async (event) => {
        event.preventDefault();
        await axios.put(`${API}/users/${user.id}`, user);
        if (users) {
            navigate(`/users/${users[0].id}`, {state: {currentUser: user, users: users}})
        } else {
            window.alert("No users found at this time. Try again later or select another type of food.")
        }
    };

    const options = [
        { value: "", label: "---select---" },
        { value: "american", label: "American"},
        { value: "caribbean", label: "Caribbean"},
        { value: "chinese", label: "Chinese"},
        { value: "english", label: "English"},
        { value: "french", label: "French"},
        { value: "indian", label: "Indian"},
        { value: "italian", label: "Italian"},
        { value: "japanese", label: "Japanese"},
        { value: "korean", label: "Korean"},
        { value: "mexican", label: "Mexican"},
        { value: "peruvian", label: "Peruvian"},
        { value: "vegan", label: "Vegan"}
    ];
    
    const dropdown = 
    <Select
    
        id="food_pref"
        value={options.value}
        options={options}
        defaultValue={options.find((cuisine) => user.food_pref === cuisine.value)}
        onChange={handleInputChange}
    />

    return (
        <div>
                    <Typography 
                        sx={{
                        fontFamily: "Signika Negative",
                        fontSize: "5vh",
                        letterSpacing: 1,
                        fontWeight: 900,
                        textShadow: "2px 0 black",
                        textAlign:"center",
                        margin:0,
                        padding:0
                        }}
                        >What are you 
                    </Typography> 
                    <Typography
                    sx={{
                        fontFamily: "Signika Negative",
                        fontSize: "5vh",
                        letterSpacing: 1,
                        fontWeight: 900,
                        textShadow: "2px 0 black",
                        textAlign:"center",
                        margin:0,
                        padding:0
                        }}
                    >craving?
                    </Typography>
                <label htmlFor="food_pref"> 
                </label> 
            <form onSubmit={handleEdit}>
            {/* <Stack spacing={2} justifyContent="center" alignItems="center"> */}
                <Grid container spacing={4} sx={{ mt:5, height:"530px", overflow:"scroll"}}>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="american" className="" src={american} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="caribbean" className="" src={caribbean} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="chinese" className="" src={chinese} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="english" className="" src={english} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="french" className="" src={french} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="indian" className="" src={indian} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="italian" className="" src={italian} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="japanese" className="" src={japanese} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="korean" className="" src={korean} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="mexican" className="" src={mexican} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="peruvian" className="" src={peruvian} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <img onClick={handleInputChange} id="vegan" className="" src={vegan} alt="american-food" style={{height: "141px", width: "161px"}} />
                    </Grid>
                </Grid>
            {/* </Stack> */}

        {/* {dropdown}       */}
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
            mt:3,
            mb:2
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

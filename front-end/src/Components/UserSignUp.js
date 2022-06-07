import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField, Typography } from "@mui/material";
import SingUp from '../Assets/signup.png';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Back from '../Assets/Back.png';



const API = process.env.REACT_APP_API_URL;

export default function UserSignUp () {

let navigate = useNavigate();
const [user, setUser] = useState({
    password: "",
    email: "",
    food_pref: null,
    name: "",
    photo: ""
});

const newUser = (addedUser) => {
    const fetchData = async () => {
        try {
            const res = await axios.post(`${API}/users/register`, addedUser);
            
            if(res.data.payload.constraint){
                window.alert("That email address already exists")
            } else {
                setUser(res.data.payload)
                navigate(`/login`)
            }
        } catch (error) {
            console.warn("catch", error)
        }
    };
    fetchData();
};

const handleTextChange = (event) => {
    if (event.target.id === "photo") {
        setUser({ ...user, [event.target.id]: event.target.value});
    } else {
        setUser({ ...user, [event.target.id]: event.target.value.toLowerCase()});
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    newUser(user);
};

    return (
            <div style={{backgroundColor:"#FFA756"}}>
                <Container maxWidth="xs" >
                    <Stack>
                        <Typography sx={{ mt: 2}}></Typography>
                        <Link to={'/'}>
                            <img className="sign-up" src={Back} alt="back" style={{
                                width: '55px',
                                height: '35px',
                                position: 'absolute',
                                left:'1',
                                top: '3'
                                }}></img>
                        </Link>
                    </Stack>


                    <Stack spacing={4} justifyContent="center" alignItems="center">
                        <Typography variant="h5" sx={{
                                mt: 9,
                                textAlign: "center",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '60px',
                                color: 'white'
                                }}> Welcome!
                        </Typography>
                        <Box alignItems="center" justifyContent="center">
                            <img className="sign-up" src={SingUp} alt="signup" style={{
                                width: '357px',
                                height: '235px',
                                }}></img> 
                        </Box>
                    </Stack>

                    <Stack spacing={1} >
                        <form className="signup-form" onSubmit={handleSubmit}>
                                <TextField
                                    variant="standard"
                                    className="photo"
                                    label='photo'
                                    id="photo"
                                    name="photo"
                                    value={user.photo}
                                    onChange={handleTextChange}
                                    type="text"
                                    fullWidth required
                                />
                                <TextField
                                    variant="standard"
                                    className="name-input"
                                    label='Name'
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleTextChange}
                                    placeholder="Enter Name"
                                    type="text"
                                    fullWidth required
                                />

                                <TextField
                                    variant="standard"
                                    className="password-input"
                                    label='Password'
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleTextChange}
                                    placeholder="Enter password with at least 8 characters"
                                    type="password"
                                    fullWidth required
                                />

                                <TextField
                                    variant="standard"
                                    className="email-input"
                                    label='email'
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleTextChange}
                                    placeholder="Enter email"
                                    type="email"
                                    fullWidth required
                                />                  

                            <Box sx={{ display:'flex' }} alignItems="center" justifyContent="center">
                                    <Button
                                        sx={{mt: 5,
                                            fontSize: "3.3vh",
                                            fontFamily: "Signika Negative",
                                            bgcolor: '#FF2929',
                                            width:"35vh",
                                            height:"7vh",
                                            borderRadius:'30px',
                                            fontWeight: 600,
                                            textShadow: "2px 0 white",
                                            textTransform: 'none',
                                            color: 'white'}}
                                        variant="contained"
                                        color="inherit"
                                        type="submit">
                                    Sign Up
                                </Button>
                            </Box>

                            <Typography variant="h5" sx={{
                                mt: 2,
                                textAlign: "center",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '15px',
                                color: '#655969'
                                }}>
                                By clicking Signing up, you agree to our Terms and Conditions and Privacy Policy.
                            </Typography>
                            <Typography variant="h5" sx={{
                                mt: 2,
                                textAlign: "center",
                                fontFamily: "Signika Negative",
                                fontWeight:'bold',
                                fontSize: '13px',
                                color: '#655969'
                                }}>
                                Already have an account? <Link to={'/login'}>Sign in</Link>
                            </Typography>
                            <Typography sx={{ mt: 8.7}}></Typography>
                        </form>
                    </Stack>
                </Container>
            </div>  
    )

}


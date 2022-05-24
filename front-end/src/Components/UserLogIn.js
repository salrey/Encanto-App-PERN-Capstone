import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useState} from "react"
import {Link, useNavigate } from "react-router-dom"

//Import images from assets
import Back from '../Assets/Back.png';
import UpperBurger from "../Assets/upperHamburger.png"
import Cheese from "../Assets/Cheese.png"
import BottomHamburger from "../Assets/Bottom_Hamburger.png"

export default function UserLogIn ({setIsLoggedIn, setCurrentUser}) {

// Set a state for log in
const [input, setInput] = useState({
    password:"",
    email:""
})

//API PATH
const API = process.env.REACT_APP_API_URL;

// Call React Router's useNavigate function
const navigate = useNavigate();

// Event handler to keep track of user's input
const handleChange = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value.toLowerCase()});
};

// Event handler to check if the user's input is valid. If it is, log the user in successfully and take them to /user. If not, throw error message
const handleSubmit = async (event) => {
    
    event.preventDefault();
    // {password:input.password, email:input.email,withCredentials: true}
    // before there was just input
    const fetchData = async () => {
        try {
          console.log("Hitting logIn page");
          const res = await axios.post(`${API}/login`,  {password:input.password, email:input.email,withCredentials: true});
          console.log("how does res look like: ", res.data)
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          navigate('/users');
          
        } catch (err) {
          return window.alert("Invalid password or email address")
        }
      };
      fetchData();
};

    return (
        <div style={{backgroundColor:"#FFA756"}}>
            <Container maxWidth="xs">
            <Link to={'/'}>
                <img 
                src={Back} 
                alt="back"  
                style={{
                width: '55px',
                height: '35px',
                marginTop:"1.5vh",
                marginLeft:"1.5vh"
                }}
                />
            </Link>
            <Typography  
              sx={{
              color:"yellow",
              fontFamily: "Signika Negative",
              fontSize: "9.5vh",
              letterSpacing: 1,
              fontWeight: 900,
              textAlign:"left",
              textShadow: "3px 0 yellow",
              ml:"5vh",
              mt:"5vh"
              }}>
                Hello !
            </Typography>
            <Typography
                sx={{
                color:"white",
                fontFamily: "Signika Negative",
                fontSize: "3.7vh",
                letterSpacing: 1,
                fontWeight: 600,
                textShadow: "2px 0 white",
                textAlign:"left",
                ml:"3.1vh",
                }}>
                What are you craving?
            </Typography>
            <Box 
               sx={{
                   display:'flex',
                   justifyContent:"center",
                   mt:"5vh"
               }}
            >
            <img src={UpperBurger} alt="upper-burger"/>
            </Box>
                <Box sx={{
                    display:"flex",
                    textAlign:"center"
                }}>
            <form onSubmit={handleSubmit}>
                <input
                    id="email"
                    value={input.email}
                    type="text"
                    onChange={handleChange}
                    placeholder="Email here..."
                    required
                    style={{
                        marginTop:"1.5vh",
                        width:"40vh",
                        height:"7vh",
                        borderRadius:"50px",
                        border:"none",
                        textAlign:"center",
                        fontSize:"3vh",
                       
                    }}
                    />
                <img src={Cheese} alt="cheese"
                    style={{marginTop:"1.5vh"}}
                />
                     <input
                    id="password"
                    value={input.password}
                    type="text"
                    onChange={handleChange}
                    placeholder="password here..."
                    required
                    style={{
                        marginTop:"1.2vh",
                        height:"7vh",
                        width:"40vh",
                        borderRadius:"50px",
                        border:"none",
                        textAlign:"center",
                        fontSize:"3vh",
                 
                    }}
                    />
                <img src={BottomHamburger} alt="bottom-burger"
                 style={{
                     marginTop:"1.5vh"
                }}
                />
                    <button
                        style={{
                            borderRadius:"50px",
                            border:"none",
                            width:"35vh",
                            height:"7vh",
                            marginTop:5,
                            backgroundColor:"#FF2929",
                            color:"white",
                            fontFamily: "Signika Negative",
                            fontSize: "3.3vh",
                            letterSpacing: 1,
                            fontWeight: 600,
                            textShadow: "2px 0 white",
                        }}
                    >Log In
                    </button>
                    <Typography 
                    sx={{color:"white",
                        fontWeight: 600,
                        mt:"2vh",
                        fontSize: "1.8vh",
                        fontFamily: "Signika Negative",
                    }}
                    >
                        Forgot your password? click 
                       <Link to={'/'}>
                        <span style={{color:"#4A76B8", textDecoration:"underline"}}> 
                        here 
                        </span> 
                       </Link>
                    </Typography>
                    <Typography
                        sx={{
                        color:"white",
                        fontFamily: "Signika Negative",
                        fontSize: "1.8vh",
                        letterSpacing: 2,
                        fontWeight: 600,
                        textAlign:"center",
                        mt:"15.2vh"
                        }}
                    >
                        EnCanto 2022 Terms
                    </Typography>
                </form>
            </Box>
        </Container>
    </div>
    )

}
import React from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

//MUI
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


//Icon
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Footer () {
  // const navigate = useNavigate();
  
  // Logging user out in progress
  // const logOut = (event) => {
  //   event.preventDefault();
  //   // return navigate("/login")
  // }

  return (

    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor:"white" }}>
      <Box sx={{ display:"flex", justifyContent:"center"}}>
      <Toolbar>
        <Link to={"/users"}>
        <IconButton aria-label="restaurant-icon-for-submit">
          <RestaurantMenuIcon fontSize="large" sx={{mr:"5vh", '&:hover': {color: "#F9C17A"}}}/>
        </IconButton>
        </Link>
        <Link to={"/chat"}>
        <IconButton aria-label="chat-icon">
          <ChatBubbleOutlineIcon sx={{color:"#747474",'&:hover': {color: "#F9C17A"}}} fontSize="large"/>
        </IconButton>
        </Link>
        <Link to={"/login"}>
          <form action="/logout?_method=DELETE" method="POST">
            <IconButton aria-label="home-icon" type="submit">
                <LogoutIcon sx={{color:"#747474", ml:"5vh", '&:hover': {color: "#F9C17A"}}} fontSize="large"/>
            </IconButton>
          </form>
        </Link>
      </Toolbar>
      </Box>
    </AppBar>

  )
}
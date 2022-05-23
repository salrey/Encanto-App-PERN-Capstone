import React from 'react';
import { Link } from 'react-router-dom';

//MUI
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';


//Icon
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function Footer () {

return (

    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor:"white" }}>
        <Box sx={{ display:"flex", justifyContent:"center"}}>
        <Toolbar>
          <Link to={"/users"}>
            <IconButton aria-label="home-icon">
                <HomeIcon sx={{color:"#747474", mr:"5vh", '&:hover': {color: "#F9C17A"}}} fontSize="large"/>
            </IconButton>
          </Link>
          <Link to={"/users"}>
          <IconButton aria-label="restaurant-icon-for-submit">
            <RestaurantMenuIcon fontSize="large" sx={{'&:hover': {color: "#F9C17A"}}}/>
          </IconButton>
          </Link>
          <Link to={"/users"}>
          <IconButton aria-label="chat-icon">
            <ChatBubbleOutlineIcon sx={{color:"#747474", ml:"5vh",'&:hover': {color: "#F9C17A"}}} fontSize="large"/>
          </IconButton>
          </Link>
        </Toolbar>
        </Box>
      </AppBar>

)
}
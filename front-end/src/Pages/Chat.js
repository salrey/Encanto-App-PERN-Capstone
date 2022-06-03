import React from 'react';
import Footer from '../Components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Conversations from '../Components/Conversations';

// MUI components
import AppBar from '@mui/material/AppBar';
import { Box, Container, Typography } from "@mui/material";


// Import images from assets
// import logo from '../Assets/logo_encanto.png';
// import Avatar from '../Assets/avatar2.jpg';


  const Chat = ({ currentUser }) => {
  const API = process.env.REACT_APP_API_URL;
  const [matches, setMatches] = useState([])

  useEffect(() => {

    const fetchData = async () => {
        try {
            console.log("Hitting logIn page");
            const res = await axios.post(`${API}/match-requests/get-match`, {currentUser_id: currentUser.id, request_status: 1});
            console.log("how does res look like: ", res.data)
            setMatches(res.data.payload)
        }catch(error) {
          console.log(error)
        }
  };
  fetchData()
}, [API,currentUser.id])
console.log(currentUser)
console.log(matches)


  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:"#CC8F58", padding:2}}>
          <Typography  
                  sx={{
                    color:"white",
                    fontFamily: "Signika Negative",
                    fontSize: "3vh",
                    letterSpacing: 1,
                    fontWeight: 900,
                    textAlign:"center",
                    textShadow: "3px 0 yellow",
              
                  }}>
                    Matches
          </Typography>
        </AppBar>
      </Box>
      <Container maxWidth="xs">
        <Box sx={{mt:4}}>
        {matches.map((match,i ) => {
          return (
              <Box key={i} sx={{borderRadius:"20px", backgroundColor:"#EDB27C", height:"115px", mt:2}}>
                <Conversations match={match} currentUser={currentUser}/>
              </Box>
          )
        })}
        </Box>
      </Container>
      <Footer/>
    </>
  );
}

export default Chat;

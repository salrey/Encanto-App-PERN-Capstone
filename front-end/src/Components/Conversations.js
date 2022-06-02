import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// Import images from assets
import Avatar from '../Assets/avatar2.jpg';

const Conversations = ({match, currentUser})  => {

    const [user, setUser] = useState([]);

    const API = process.env.REACT_APP_API_URL;
  
    useEffect(() => {
  
      const fetchData = async () => {
          try {
              console.log("Hitting logIn page");
              const res = await axios.get(`${API}/users/${match.request_from === currentUser.id ? match.request_to : match.request_from}`);
              console.log("how does res look like from Conversations: ", res.data)
              setUser(res.data.payload)
          }catch(error) {
            console.log(error)
          }
    };
    fetchData()
  }, [API, match.request_from])

  console.log(user)

    
  return (
    <article>
        {/* <div>Conversations</div> */}
        {/* <p>{match.request_from === currentUser.id ? match.request_to : match.request_from}</p> */}
       <Link to={`/each-conversation/${match.request_from === currentUser.id ? match.request_to : user.id}`} style={{textDecoration:"none", display:"flex"}}> 
        <img src={Avatar} alt="" style={{width:"65px", height:"65px", borderRadius:"50px", marginTop:"3.1vh", marginLeft:"3.7vh"}} />
        <h2 style={{ fontFamily: "Signika Negative", fontWeight: 700, color:"white", marginRight:"6vh", textShadow: "2px 0 white", marginTop:"4.5vh", marginLeft:"2vh"}}>{user.name} </h2>
       </Link>

    </article> 
  )
}

export default Conversations;
import axios from "axios";
import React, { useState, useEffect } from "react"
import {useNavigate } from "react-router-dom"

export default function UserLogIn ({setIsLoggedIn, setCurrentUser}) {

// Set a state for log in
const [input, setInput] = useState({
    name:"",
    email:""
})

const [users, setUsers] = useState([]);

//API PATH
const API = process.env.REACT_APP_API_URL;

// Call React Router's useNavigate function
const navigate = useNavigate();

//Fetching data via axios
useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Hitting logIn page");
        const res = await axios.get(`${API}/login`);
        setUsers(res.data.payload);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, []);

// Event handler to keep track of user's input
const handleChange = (event) => {
    setInput({ ...input, [event.target.id]: event.target.value });
};

// Event handler to check if the user's input is valid. If it is, log the user in successfully and take them to /user. If not, throw error message
const handleLogIn = async (event) => {
    
    event.preventDefault();
    
    const find = users.find((user) => user.name === input.name.toLowerCase() && user.email === input.email.toLowerCase());
    console.log("Find: ", find)
    if (find) {
        await setIsLoggedIn(true);
        await setCurrentUser(find)
        navigate('/users');
    } else {
        setInput({name:"", email:""});
        window.alert("Invalid name or email");
    }
};

    return (
        <div>
            <form onSubmit={handleLogIn}>
                <input
                    id="email"
                    value={input.email}
                    type="text"
                    onChange={handleChange}
                    placeholder="email"
                    required
                    />
                     <input
                    id="name"
                    value={input.name}
                    type="text"
                    onChange={handleChange}
                    placeholder="name"
                    required
                    />
                    <button>Log In</button>
            </form>
        </div>
    )

}
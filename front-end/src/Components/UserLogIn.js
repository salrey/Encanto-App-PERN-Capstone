import React, { useState } from "react"
import {useNavigate } from "react-router-dom"

export default function UserLogIn ({setIsLoggedIn}) {

// Set a state for log in
const [userLogIn, setUserLogIn] = useState({
    name:"",
    email:""
})

// Call React Router's useNavigate function
const navigate = useNavigate();

// Event handler to keep track of user's input
const handleChange = (event) => {
    setUserLogIn({ ...userLogIn, [event.target.id]: event.target.value });
};

const handleLogIn = async (event) => {
    event.preventDefault()
    await setIsLoggedIn(true)
    navigate("/users")
};

    return (
        <div>
            <form onSubmit={handleLogIn}>
                <input
                    id="email"
                    value={userLogIn.email}
                    type="text"
                    onChange={handleChange}
                    placeholder="email"
                    required
                    />
                     <input
                    id="name"
                    value={userLogIn.name}
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
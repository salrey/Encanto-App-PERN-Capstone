import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const API = process.env.REACT_APP_API_URL;

export default function UserSignUp ({ callBackUser }) {

let navigate = useNavigate();
const [user, setUser] = useState({
    password: "",
    email: "",
    food_pref: null,
    name: "",
});

const newUser = (addedUser) => {
    const fetchData = async () => {
        try {
            const res = await axios.post(`${API}/users/register`, addedUser);
            console.log(res.data.payload)
            if(res.data.payload.constraint){
                window.alert("That email address already exists")
            } else {
                setUser(res.data.payload)
                callBackUser(res.data.payload)
                navigate(`/login`)
            }

        } catch (error) {
            console.warn("catch", error)
        }
    };
    fetchData();
};

const handleTextChange = (event) => {
setUser({ ...user, [event.target.id]: event.target.value.toLowerCase()});
};

const handleSubmit = (event) => {
    event.preventDefault();
    newUser(user);
};

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="new-user-name" htmlFor="name">Name</label>
                <br></br>
                    <input
                        className="name-input"
                        id="name"
                        value={user.name}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Name"
                        required
                    />
        <br></br>
                <label className="new-user-password" htmlFor="password">Password</label>
                <br></br>
                    <input
                        className="password-input"
                        id="password"
                        value={user.password}
                        type="text"
                        onChange={handleTextChange}
                        placeholder="Password"
                        required
                    />
        <br></br>
                <label className="new-user-email" htmlFor="email">Email</label>
                <br></br>
                    <input
                        className="email-input"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={handleTextChange}
                        placeholder="Email"
                        required
                    />
        <br></br>
                    
                    <button className="submit-input">Submit</button>
                    
            </form>
        </div>
    )

}


import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const API = process.env.REACT_APP_API_URL;

export default function UserSignUp ({ callBackUser }) {

let navigate = useNavigate();
const [user, setUser] = useState({
    name: "",
    email: "",
    food_pref: null,
});

const newUser = (addedUser) => {
    axios
    .post(`${API}/users`, addedUser).then((response) => {
        console.log(response.data.payload)
        return setUser(response.data.payload)
        })
        .then(navigate(`/users`))
        .catch((err) => console.warn("catch", err));
    callBackUser(user)
};

const handleTextChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value });
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


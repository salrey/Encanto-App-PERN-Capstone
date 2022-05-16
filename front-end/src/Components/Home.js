import React from "react"
import { Link } from "react-router-dom"

export default function Home () {

    return (
    <div>
        <div>Landing page in process</div>
            <Link to={`/signup`}>
                <button className="signup-button">Sign Up</button>
            </Link>
            <Link to={`/login`}>
                <button className="login-button">Log In</button>
            </Link>
    </div>
    )

}
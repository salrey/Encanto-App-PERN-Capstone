import React from "react"

import UserLogIn from "../Components/UserLogIn"

export default function LogIn ({setIsLoggedIn, setCurrentUser}) {

    return (
        <UserLogIn setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser}/>
    )

}
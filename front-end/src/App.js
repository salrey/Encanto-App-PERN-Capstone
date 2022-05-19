import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import Redirect from "./Pages/Redirect";
import "./App.css"


const App = () => {
const [currentUser, setCurrentUser] = useState();

// Once a user is logged in, change the state's value to true
const [isLoggedIn, setIsLoggedIn] = useState(false);

console.log("are you logged In?: ", isLoggedIn);
console.log("the current user: ", currentUser)
  return (
    <main>
      <Routes>
        <Route
          exact path="/"
          element={<Landing />}
         />
         <Route
          path="/login"
          element={<LogIn 
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
            />}
         />
          <Route
          path="/signup"
          element={<SignUp callBackUser={setCurrentUser}/>}
         />
          <Route
          path="/users"
          element={<Index currentUser={currentUser}/>}
         />
         <Route
          path="/users/:id"
          element={<Show/>}
         />
         <Route
          path="*"
          element={<Redirect />}
         />
      </Routes>
    </main>
  );
}

export default App;

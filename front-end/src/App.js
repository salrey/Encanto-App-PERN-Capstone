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

const App = () => {

  return (
    <main>
      <Routes>
        <Route
          exact path="/"
          element={<Landing />}
         />
         <Route
          path="/login"
          element={<LogIn/>}
         />
          <Route
          path="/signup"
          element={<SignUp/>}
         />
          <Route
          path="/users"
          element={<Index/>}
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

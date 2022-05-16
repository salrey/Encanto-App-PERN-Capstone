import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Index from "./Pages/Index";
import Show from "./Pages/Show";


const App = () => {

  return (
    <main>
      <Routes>
        <Route
          path="/"
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
          path="/index"
          element={<Index/>}
         />
         <Route
          path="/show"
          element={<Show/>}
         />
      </Routes>
    </main>
  );
}

export default App;

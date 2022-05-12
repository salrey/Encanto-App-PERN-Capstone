import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"


const App = () => {
  const [test, setTest] = useState([])
  const API = process.env.REACT_APP_API_URL;
   
  useEffect(() => {
      axios.get(`${API}/test`)
      .then((res) => setTest(res.data))
      .catch((error) => console.warn(error))
  }, [API])


  
  return (
    <>
      <div> Hello World </div>
      {test.map((day, i) => { 
        return <p key={i}>{day.name}</p>
      })}
    </>
  );
}

export default App;

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


const Users = () => {
    const [users, setUsers] = useState([]);
    const API = process.env.REACT_APP_API_URL;

    useEffect(()=> {
        axios.get(`${API}/users`)
        .then((res) => { console.log(res.data.payload); return setUsers(res.data.payload)})
        .catch((error) => { throw error })
    }, [API]);

    return (
    <section>
        {users.map((user) => {
            return <div key={user.id}>{user}</div>
        })}
    </section>
    );
}
  
export default Users;

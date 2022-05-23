import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = ({food_pref, currentUser}) => {
    const [users, setUsers] = useState();
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // console.log("food pref", food_pref)
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users?food_pref=${food_pref}`);
                // console.log("response data", res.data)
                setUsers(res.data.payload.filter((user) => user.email !== currentUser.email))
            } catch (err) {
                return err
            }
        }
        fetchData();
    }, [API, food_pref, currentUser.email])

    const display = food_pref && users.length ? users.map((user) => {
        return <Link to={"/users/"+user.id} key={user.id} state={{currentUser: currentUser}}>{user.name}</Link>
    }) : "No users found at this time, try again later or choose another preference"

    return (
    <section>
        {food_pref && display}
    </section>
    );
}
  
export default Users;

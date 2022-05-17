import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = ({food_pref}) => {
    const [users, setUsers] = useState();
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        console.log("food pref", food_pref)
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/users?food_pref=${food_pref}`);
                console.log(res.data)
                setUsers(res.data.payload)
            } catch (err) {
                return err
            }
        }
        fetchData();
    }, [API, food_pref])

    return (
    <section>
        {food_pref && users.map((user) => {
            return <Link to={"/users/"+user.id} key={user.id}>{user.name}</Link>
        })}
    </section>
    );
}
  
export default Users;

import axios from "axios";
import React, { useContext } from "react";
import APIContext from "../context/APIContext";
import { NavLink } from "react-router-dom";

interface Props {
    user: any;
    setUsers: (data: any) => void
}

const User = ({ user, setUsers }: Props) => {
    const url = useContext(APIContext);
    const deleteUser = async (_id: any) => {
        try {
            const response = await axios.delete(`${url}/user/${_id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            alert('Deleted')
            console.log(response.data);
            axios.get(url + '/user', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(response => {
                setUsers(response.data);
                console.log(response.data);
            }).catch(error => {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data));
            })
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data));
        }
    };

    return (
        <>
            <tr>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.type}</td>
                <td><button onClick={() => deleteUser(user._id)} className="btn btn-danger">DELETE</button></td>
                <td><NavLink to={'/admin/update-user/' + user._id} className="btn btn-service-master-bg">UPDATE</NavLink></td>
            </tr>
        </>
    )
}


export default User;
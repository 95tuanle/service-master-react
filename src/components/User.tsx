import axios from "axios";
import React, {useContext} from "react";
import APIContext from "../context/APIContext";
import TokenContext from "../context/TokenContext";
import {NavLink} from "react-router-dom";

interface Props {
    user: any;
    setUsers: (data: any) => void
}

const User = ({user, setUsers}: Props) => {
    const url = useContext(APIContext);
    const token = useContext(TokenContext);
    const deleteUser = async (_id: any) => {
        try {
            const response = await axios.delete(`${url}/user/${_id}`, {headers: {Authorization: `Bearer ${token}`}})
            alert('Deleted')
            console.log(response.data);
            axios.get(url + '/user', {headers: {Authorization: `Bearer ${token}`}}).then(response => {
                setUsers(response.data);
                console.log(response.data);
            }).catch(error => {
                alert(error);
                console.error(error);})
        } catch (error) {
            alert(error)
            console.error(error);
        }
    };

    return (
        <>
            {user._id} - {user.email} - {user.first_name} {user.last_name} - {user.type} <button onClick={()=>deleteUser(user._id)}>DELETE</button><NavLink to={'/update/' + user._id}>UPDATE</NavLink><br/>
        </>
    )
}


export default User;
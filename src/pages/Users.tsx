import {useContext, useEffect} from "react";
import APIContext from "../context/APIContext";
import axios from "axios";
import User from "../components/User";

interface Props {
    users: any[];
    setUsers: (users: any) => void
}

const Users = ({users, setUsers}: Props) => {
    const url = useContext(APIContext);

    useEffect(() => {
        axios.get(`${url}/user`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(response => {
            setUsers(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data))})
    }, [url, setUsers]);

    return (
        <>
            {users.map(user => (
                <User user={user} setUsers={setUsers} key={user._id}/>
            ))}
        </>
    )
}

export default Users;
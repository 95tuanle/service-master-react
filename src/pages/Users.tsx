import {useContext, useEffect} from "react";
import APIContext from "../context/APIContext";
import axios from "axios";
import TokenContext from "../context/TokenContext";
import User from "../components/User";

interface Props {
    users: any[];
    setUsers: (data: any) => void
}

const Users = ({users, setUsers}: Props) => {
    const url = useContext(APIContext);
    const token = useContext(TokenContext);

    useEffect(() => {
        if (token) {
            axios.get(`${url}/user`, {headers: {Authorization: `Bearer ${token}`}}).then(response => {
                setUsers(response.data);
                console.log(response.data);
            }).catch(error => {
                alert(error);
                console.error(error);})
        }
    }, [url, token, setUsers]);

    return (
        <>
            {users.map(user => (
                <User user={user} setUsers={setUsers} key={user._id}/>
            ))}
        </>
    )
}

export default Users;
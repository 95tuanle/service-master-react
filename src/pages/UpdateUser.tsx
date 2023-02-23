import {useParams} from "react-router-dom";
import {useContext, useState} from "react";
import APIContext from "../context/APIContext";
import TokenContext from "../context/TokenContext";
import axios from "axios";


interface Props {
    users: any;
    setUsers: (data: any) => void
}

const UpdateUser = ({users, setUsers}: Props) => {
    const url = useContext(APIContext);
    const token = useContext(TokenContext);
    const _id = useParams()._id;
    const user = users.filter((user: any) => user._id === _id)[0];

    const [inputs, setInputs] = useState({
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        password: user.password,
        type: user.type,
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (inputs.firstName === "" || inputs.lastName === "" || inputs.email === "" || inputs.password === "" || inputs.type === "") {
            alert("input must not be empty")
        } else {
            try {
                const response = await axios.put(url + '/user/' + _id, {
                    'first-name': inputs.firstName,
                    'last-name': inputs.lastName,
                    'email': inputs.email,
                    'password': inputs.password,
                    'type': inputs.type
                },{headers: {Authorization: `Bearer ${token}`}});
                alert('Updated')
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
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    First name:
                    <input name="firstName" type="text" value={inputs.firstName} onChange={handleChange}/>
                </label><br/>
                <label>
                    Last name:
                    <input name="lastName" type="text" value={inputs.lastName} onChange={handleChange}/>
                </label><br/>
                <label>
                    Email:
                    <input name="email" type="email" value={inputs.email} onChange={handleChange}/>
                </label><br/>
                <label>
                    Password:
                    <input name="password" type="password" value={inputs.password} onChange={handleChange}/>
                </label><br/>
                <select name="type" value={inputs.type} onChange={handleChange}>
                    <option value="ADMIN">ADMIN</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="PROVIDER">PROVIDER</option>
                </select><br/>
                <input type="submit" value="Update" />
            </form>
        </>
    )
}


export default UpdateUser;
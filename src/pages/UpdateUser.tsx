import {useParams} from "react-router-dom";
import {useContext, useState} from "react";
import APIContext from "../context/APIContext";
import axios from "axios";


interface Props {
    users: any;
    setUsers: (data: any) => void
}

const UpdateUser = ({users, setUsers}: Props) => {
    const url = useContext(APIContext);
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
                }, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                alert('Updated')
                console.log(response.data);
                axios.get(url + '/user', {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(response => {
                    setUsers(response.data);
                    console.log(response.data);
                }).catch(error => {
                    console.error(error.response.data);
                    alert(JSON.stringify(error.response.data));
                })
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        First name:</label>
                    <input name="firstName" type="text" value={inputs.firstName} onChange={handleChange}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Last name:</label>
                    <input name="lastName" type="text" value={inputs.lastName} onChange={handleChange}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Email:</label>
                    <input name="email" type="email" value={inputs.email} onChange={handleChange}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <label>
                        Password:</label>
                    <input name="password" type="password" value={inputs.password} onChange={handleChange}
                           className="form-control"/>
                </div>
                <select name="type" value={inputs.type} onChange={handleChange}>
                    <option value="ADMIN">ADMIN</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="PROVIDER">PROVIDER</option>
                </select><br/><br/>
                <input type="submit" value="Update" className="btn btn-service-master-bg mb-5"/>
            </form>
        </div>
    )
}


export default UpdateUser;
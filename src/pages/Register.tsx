import {useContext, useState} from "react";
import axios from 'axios';
import APIContext from "../context/APIContext";

const Register = () => {
    const url = useContext(APIContext)

    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        type: "ADMIN",
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
                const response = await axios.post(`${url}/user`, {
                    'first-name': inputs.firstName,
                    'last-name': inputs.lastName,
                    'email': inputs.email,
                    'password': inputs.password,
                    'type': inputs.type
                });
                alert('Registered')
                console.log(response.data);
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
                <input type="submit" value="Register" />
            </form>
        </>
    )
}

export default Register;
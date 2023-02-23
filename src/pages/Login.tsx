import {useContext, useState} from "react";
import APIContext from "../context/APIContext";
import axios from "axios";

interface Props {
    updateToken: any
}

const Login = ({updateToken} : Props) => {
    const url = useContext(APIContext)

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (inputs.email === "" || inputs.password === "") {
            alert("input must not be empty")
        } else {
            try {
                const response = await axios.post(url+'/token', {
                    'email': inputs.email,
                    'password': inputs.password,
                });
                alert('Logged In')
                console.log(response.data);
                updateToken(response.data)
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
                    Email:
                    <input name="email" type="email" value={inputs.email} onChange={handleChange}/>
                </label><br/>
                <label>
                    Password:
                    <input name="password" type="password" value={inputs.password} onChange={handleChange}/>
                </label><br/>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default Login;
import {useContext, useState} from "react";
import APIContext from "../context/APIContext";
import axios from "axios";
import ServiceMasterLogo from '../assets/images/service-master-logo.png';
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const url = useContext(APIContext);
    const navigate = useNavigate();

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
                const response = await axios.post(url+'/authentication', {
                    'email': inputs.email,
                    'password': inputs.password,
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user_type", response.data.user_type);
                console.log(response.data);
                alert('Signed In');
                navigate('/');
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center signup-container align-items-center my-sm-5 my-0'>
                <div className='col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-8 col-12'>
                    <div className='card registration-card m-sm-0 my-2'>
                        <div className='card-body px-sm-5 px-4'>
                            <div className='row text-center'>
                                <div className='col-12'>
                                    <img src={ServiceMasterLogo} alt="my-little-tribe-logo" className='mt-3 mb-2 w-50' />
                                </div>
                            </div>
                            <div className='row text-center'>
                                <div className='col-12'>
                                    <p className='heading'>Hello Again!</p>
                                    <p className='generic-paragraph'>We're glad that you're back.</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="email-field" className="mb-3 input-label">Email</label>
                                        <input
                                            name="email" type="email" value={inputs.email}
                                            className={`form-control input-field`}
                                            onChange={handleChange}
                                            id='email-field' />
                                    </div>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="password-field" className="mb-3 input-label">Password</label>
                                        <input
                                            name="password" type="password" value={inputs.password}
                                            className={`form-control input-field`}
                                            onChange={handleChange}
                                            id='password-field' />
                                    </div>
                                    <span className="btn btn-primary col-12 mt-2 mb-4 btn-service-master-bg text-dark"
                                          onClick={handleSubmit}>Sign In</span>
                                </div>
                            </div>

                            <div className='row text-center'>
                                <div className='col-12'>
                                    <p className='generic-paragraph mb-4'>Don't have an account? <a href='/sign-up'>Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
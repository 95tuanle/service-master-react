import React, {useContext, useState} from "react";
import axios from 'axios';
import APIContext from "../context/APIContext";
import ServiceMasterLogo from '../assets/images/service-master-logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import {AdminString, CustomerString, ProviderString} from "../Utilities";

const SignUp = () => {
  const url = useContext(APIContext);
  const navigate = useNavigate();
  const userTypes = [AdminString, CustomerString, ProviderString];

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
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
        console.log(response.data);
        alert('Signed Up')
        navigate('/sign-in');
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
                  <img src={ServiceMasterLogo} alt="service-master-logo" className='mt-3 mb-2 w-50'/>
                </div>
              </div>
              <div className='row text-center'>
                <div className='col-12'>
                  <p className='heading'>We're glad that you’re here</p>
                  <p className='generic-paragraph'>You're almost ready to get started!</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className={`form-group mb-4`}>
                    <label htmlFor="first-name-field" className="mb-3 input-label">First
                      name</label>
                    <input
                      name="firstName"
                      type="text"
                      className={`form-control input-field`}
                      onChange={handleChange}
                      value={inputs.firstName}
                      id='first-name-field'/>
                  </div>
                  <div className={`form-group mb-4`}>
                    <label htmlFor="last-name-field" className="mb-3 input-label">Last name</label>
                    <input
                      name="lastName"
                      type="text"
                      className={`form-control input-field`}
                      onChange={handleChange}
                      value={inputs.lastName}
                      id='last-name-field'/>
                  </div>
                  <div className={`form-group mb-4`}>
                    <label htmlFor="email-field" className="mb-3 input-label">Email</label>
                    <input
                      name="email"
                      type="email"
                      className={`form-control input-field`}
                      onChange={handleChange}
                      value={inputs.email}
                      id='email-field'/>
                  </div>
                  <div className={`form-group mb-4`}>
                    <label htmlFor="password-field" className="mb-3 input-label">Password</label>
                    <input
                      name="password"
                      type="password"
                      className={`form-control input-field`}
                      onChange={handleChange}
                      value={inputs.password}
                      id='password-field'/>
                  </div>
                  <div className={`form-group mb-4`}>
                    <label htmlFor="type-field" className="mb-3 input-label-dd">Type</label>
                    <div className='select-wrapper'>
                      <select
                        name="type"
                        value={inputs.type}
                        className={`form-control input-field-dd`}
                        id="type-field"
                        onChange={handleChange}>
                        <option value="" className='option-disabled'>Select</option>
                        {userTypes.map((options, index) => {
                          return (
                            <option value={options} key={index}>{options}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <span className="btn btn-primary col-12 mt-2 mb-4 btn-service-master-bg text-dark"
                        onClick={handleSubmit}>Sign up</span>
                </div>
              </div>
              <div className='row text-center'>
                <div className='col-12'>
                  <p className='generic-paragraph mb-4'>Already have an account? <NavLink
                    to='/sign-in'>Sign in</NavLink></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
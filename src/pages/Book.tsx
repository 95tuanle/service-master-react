import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import APIContext from "../context/APIContext";
import {Service} from "./AddService";


interface Provider {
    _id: string,
    name: string
}

const Book = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = useContext(APIContext);
    const urgencyOptions = ["ASAP", "Anytime", "1 week"];
    const _id = new URLSearchParams(location.search).get('_id');
    const [service, setService] = useState<Service>()
    const [providers, setProviders] = useState<Provider[]>([])

    useEffect( () => {
        const fetchService = async () => {
            try {
                let response = await axios.get(`${url}/service/${_id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                setService(response.data);
                console.log(response.data)
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        }
        fetchService().then(() => {});
    }, [_id, url])

    const handleAddProvider = (_id: string, name: string) => {
        setProviders((prevState) => [
            ...prevState,
            { name: name, _id: _id},
        ]);
    }

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                service?.providers.map(async provider => {
                    const response = await axios.get(`${url}/user/name/${provider}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                    handleAddProvider(provider, response.data);
                    console.log(response.data)
                })
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        }
        fetchProviders().then(() => {});
    }, [service?.providers, url])


    const [inputs, setInputs] = useState({
        urgency: "",
        booking_description: "",
        booking_address: "",
        booking_date: "",
        provider: "",
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(inputs)
        if (inputs.provider === "" || inputs.urgency === "" || inputs.booking_description === "" || inputs.booking_address === "" || inputs.booking_date === "") {
            alert("input must not be empty")
        } else {
            try {
                const response = await axios.post(`${url}/booking`, {
                    urgency: inputs.urgency,
                    booking_description: inputs.booking_description,
                    booking_address: inputs.booking_address,
                    booking_date: inputs.booking_date,
                    provider: inputs.provider,
                    service: _id
                }, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
                console.log(response.data);
                alert('Booked')
                navigate('/customer/bookings');
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center signup-container align-items-center my-sm-5 my-0'>
                <div className='col-xxl-5 col-xl-6 col-lg-7 col-md-8 col-sm-9 col-12'>
                    <div className='card registration-card m-sm-0 my-2'>
                        <div className='class-header btn-service-master-bg pt-3 pb-2'>
                            <div className='row text-center'>
                                <h3 className='mb-4 fw-bold'>{service?.name}</h3>
                            </div>
                        </div>
                        <div className='card-body px-sm-5 px-4'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="urgency-field" className="mb-3 input-label-dd">Urgency</label>
                                        <div className='select-wrapper'>
                                            <select
                                                name="urgency"
                                                className={`form-control input-field-dd`}
                                                id="urgency-field"
                                                onChange={handleChange} >
                                                <option value="" className='option-disabled'>Select</option>
                                                {urgencyOptions.map((options, index) => {
                                                    return (
                                                        <option value={options} key={index}>{options}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="description-field" className="mb-3 input-label">Description</label>
                                        <textarea
                                            name="booking_description"
                                            className={`form-control input-field`}
                                            onChange={handleChange}
                                            id='description-field' />
                                    </div>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="address-field" className="mb-3 input-label">Address</label>
                                        <input
                                            name="booking_address"
                                            type="text"
                                            className={`form-control input-field`}
                                            onChange={handleChange}
                                            id='address-field' />
                                    </div>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="date-field" className="mb-3 input-label">Date</label>
                                        <input
                                            name="booking_date"
                                            type="datetime-local"
                                            className={`form-control input-field`}
                                            onChange={handleChange}
                                            id='date-field' />
                                    </div>
                                    <div className={`form-group mb-4`}>
                                        <label htmlFor="provider-field" className="mb-3 input-label-dd">Provider</label>
                                        <div className='select-wrapper'>
                                            <select
                                                name="provider"
                                                className={`form-control input-field-dd`}
                                                id="provider-field"
                                                onChange={handleChange} >
                                                <option value="" className='option-disabled'>Select</option>
                                                {providers?.map((provider, index) => {
                                                    return (
                                                        <option value={provider._id} key={index}>{provider.name}</option>
                                                    )})
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <span className="btn btn-primary col-12 mt-2 mb-4 btn-service-master-bg text-dark"
                                          onClick={handleSubmit}>Book</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Book;
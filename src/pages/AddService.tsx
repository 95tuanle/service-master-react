import React, {useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";
import {Service} from "./Services";

const AddService = () => {
    const url = useContext(APIContext)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [providers, setProviders] = useState('');
    const [services, setServices] = useState<Service[]>([]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleProvidersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProviders(e.target.value);
    };

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();
        try {
            const providersArray = providers !== '' ? providers.split(',').map(provider => provider.trim()) : [];
            let data;
            if (providersArray.length === 0) {
                data = {
                    name,
                    description
                };
            } else {
                data = {
                    name,
                    description,
                    providers: providersArray
                };
            }
            let response = await axios.post(`${url}/service`, data, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            console.log(response.data);
            alert('Service added successfully');
            setName('');
            setDescription('');
            setProviders('');
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data));
        }
    }, [description, name, providers, url]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/service`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                setServices(response.data);
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        };
        fetchData().then(() => {
        });
    }, [handleSubmit, url]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${url}/service/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            const updatedServices = services.filter(service => service.service._id !== id);
            setServices(updatedServices);
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data))
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="form-group">
                    <label htmlFor="name-input">Name</label>
                    <input
                        type="text"
                        id="name-input"
                        placeholder="Enter Service Name"
                        value={name}
                        onChange={handleNameChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description-input">Description</label>
                    <input
                        type="text"
                        id="description-input"
                        placeholder="Enter Service Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="providers-input">Providers</label>
                    <input
                        type="text"
                        id="providers-input"
                        placeholder="Enter comma separated provider IDs"
                        value={providers}
                        onChange={handleProvidersChange}
                        className="form-control"
                    />
                </div>
                <div>
                    <input type="submit" value="Add Service"/>
                </div>
            </form>
            <div>
                <div>
                    <div>
                        <table className='table table-striped'>
                            <thead className='bg-dark text-white'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Providers</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map((service) => (
                                <tr key={service.service._id}>
                                    <td>{service.service._id}</td>
                                    <td>{service.service.name}</td>
                                    <td>{service.service.description}</td>
                                    <td>{service.providers.map(provider => (provider.name))}</td>
                                    <td>
                                        <button onClick={() => handleDelete(service.service._id)}
                                                className="btn btn-danger">Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddService;
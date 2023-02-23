import React, {useState, useEffect, useContext, useCallback} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";
import TokenContext from "../context/TokenContext";


interface Service {
    _id: string;
    name: string;
    description: string;
    providers: string[];
}

const AddService = () => {
    const url = useContext(APIContext)
    const token = useContext(TokenContext);
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
            } else{
                data = {
                    name,
                    description,
                    providers: providersArray
                };
            }
            let response = await axios.post(`${url}/service`, data, {headers: {Authorization: `Bearer ${token}`}});
            console.log(response.data);
            alert('Service added successfully');
            setName('');
            setDescription('');
            setProviders('');
        } catch (error: any) {
            console.error(error);
            alert(`Error adding service: ${error}`);
        }
    }, [description, name, token, providers, url]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/service`, {headers: {Authorization: `Bearer ${token}`}});
                setServices(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().then(() => {});
    },[handleSubmit, token, url]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${url}/service/${id}`, {headers: {Authorization: `Bearer ${token}`}});
            const updatedServices = services.filter(service => service._id !== id);
            setServices(updatedServices);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name-input">Name</label>
                    <input
                        type="text"
                        id="name-input"
                        placeholder="Enter Service Name"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <label htmlFor="description-input">Description</label>
                    <input
                        type="text"
                        id="description-input"
                        placeholder="Enter Service Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div>
                    <label htmlFor="providers-input">Providers</label>
                    <input
                        type="text"
                        id="providers-input"
                        placeholder="Enter comma separated provider IDs"
                        value={providers}
                        onChange={handleProvidersChange}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Service" />
                </div>
            </form>
            <div>
                <div>
                    <div>
                        <table>
                            <thead>
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
                                <tr key={service._id}>
                                    <td>{service._id}</td>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>{service.providers.join(', ')}</td>
                                    <td>
                                        <button onClick={() => handleDelete(service._id)}>Delete</button>
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
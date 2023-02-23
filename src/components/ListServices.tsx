import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";
import TokenContext from "../context/TokenContext";

interface Service {
    _id: string;
    name: string;
    description: string;
    providers: string[];
}

function ListServices() {
    const [services, setServices] = useState<Service[]>([]);
    const url = useContext(APIContext);
    const token = useContext(TokenContext);

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(url + '/service', {
                        headers: {Authorization: `Bearer ${token}`}});
                    setServices(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData().then(() => {});
        }
    }, [token, url]);

    const handleDelete = async (id: string) => {
        if (token) {
            try {
                await axios.delete(`${url}/service/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updatedServices = services.filter(service => service._id !== id);
                setServices(updatedServices);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Providers</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {services.map((service) => (
                    <tr key={service._id}>
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
        </>
    );
}

export default ListServices;

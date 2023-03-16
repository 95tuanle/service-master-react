import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";

interface Service {
    _id: string;
    name: string;
    description: string;
    providers: string[];
}

function ListServices() {
    const [services, setServices] = useState<Service[]>([]);
    const url = useContext(APIContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + '/service', {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                setServices(response.data);
                console.log(response.data);
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        };
        fetchData().then(() => {});
    }, [url]);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${url}/service/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const updatedServices = services.filter(service => service._id !== id);
            setServices(updatedServices);
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data))
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

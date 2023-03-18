import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";
import {AdminString, CustomerString, ProviderString} from "../Utilities";
import {useNavigate} from "react-router-dom";

export interface Service {
    service: {
        _id: string;
        name: string;
        description: string;
        providers: string[];
    }, providers: [{
        _id: string
        name: string
    }]
}

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const url = useContext(APIContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response: any;
                if (localStorage.getItem("user_type") === ProviderString) {
                    response = await axios.get(url + '/service/provider', {
                        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                } else if (localStorage.getItem("user_type") === CustomerString) {
                    response = await axios.get(url + '/service/customer', {
                        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                } else {
                    response = await axios.get(url + '/service/', {
                        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                }
                setServices(response.data);
                setLoading(false);
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
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            const updatedServices = services.filter(service => service.service._id !== id);
            setServices(updatedServices);
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data))
        }
    };
    const handleBook = (service: Service) => {
        navigate('/customer/book', {state: {service: service}});
    }
    const handleRegister = async (id: string) => {
        try {
            await axios.put(`${url}/service/provider/${id}`, {}, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            navigate('/provider/registered-services');
        } catch (error: any) {
            console.error(error);
            alert(JSON.stringify(error.response.data))
        }
    }

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                services.map((service) => (
                    <div key={service.service._id} className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            {service.service.name}
                        </div>
                        <div className="card-body">
                            <p className="card-text mb-3">{service.service.description}</p>
                            {localStorage.getItem("user_type") === CustomerString && (
                                <span className="btn btn-primary btn-service-master-bg text-dark" onClick={() => handleBook(service)}>Book</span>
                            )}
                            {localStorage.getItem("user_type") === AdminString && (
                                <span className="btn btn-primary btn-service-master-bg text-dark" onClick={() => handleDelete(service.service._id)}>Delete</span>
                            )}
                            {localStorage.getItem("user_type") === ProviderString && (
                                <span className="btn btn-primary btn-service-master-bg text-dark" onClick={() => handleRegister(service.service._id)}>Register</span>
                            )}
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Services;

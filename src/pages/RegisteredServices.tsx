import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";
import {Service} from "./Services";

const RegisteredServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const url = useContext(APIContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get(url + '/service/provider/registered', {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
                });
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
            await axios.delete(`${url}/service/provider/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            });
            const updatedServices = services.filter(service => service.service._id !== id);
            setServices(updatedServices);
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data))
        }
    };

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
                            <span className="btn btn-primary btn-service-master-bg text-dark" onClick={() => handleDelete(service.service._id)}>Unregister</span>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default RegisteredServices;

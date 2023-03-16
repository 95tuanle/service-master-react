import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import APIContext from "../context/APIContext";
import {AdminString, CustomerString} from "../Utilities";
import {useNavigate} from "react-router-dom";

interface Service {
    _id: string;
    name: string;
    description: string;
    providers: string[];
}

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const url = useContext(APIContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + '/service', {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
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
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const updatedServices = services.filter(service => service._id !== id);
            setServices(updatedServices);
        } catch (error: any) {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data))
        }
    };
    const handleBookNow = (service: Service): void => {
        navigate(`/customer/book?_id=${service._id}`);
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
                    <div key={service._id} className="card mb-4">
                        <div className="card-header bg-dark text-white">
                            {service.name}
                        </div>
                        <div className="card-body">
                            <p className="card-text mb-3">{service.description}</p>
                            {localStorage.getItem("user_type") === CustomerString && (
                                <span className="btn btn-primary btn-service-master-bg text-dark" onClick={() => handleBookNow(service)}>Book now</span>
                            )}
                            {localStorage.getItem("user_type") === AdminString && (
                                <span className="btn btn-primary btn-service-master-bg text-dark" onClick={() => handleDelete(service._id)}>Delete</span>
                            )}
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Services;

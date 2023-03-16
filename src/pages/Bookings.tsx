import {useContext, useEffect, useState} from "react";
import APIContext from "../context/APIContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface Booking {
}

const Bookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const url = useContext(APIContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + '/booking/customer', {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
                setBookings(response.data)
                console.log(response.data);
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        };
        fetchData().then(() => {});
    }, [url]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                bookings.map(booking => {

                })
            } catch (error: any) {
                console.error(error.response.data);
                alert(JSON.stringify(error.response.data))
            }
        }
        fetchData().then(() => {});
    }, [url])



    const [inputs, setInputs] = useState({
        booking_date: "",
    });

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(inputs)
        if (inputs.booking_date === "") {
            alert("input must not be empty")
        } else {
            try {
                const response = await axios.post(`${url}/booking`, {
                    booking_date: inputs.booking_date,
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
        <>
            {bookings.map(booking => (
                <div className="card mb-4">
                    <div className="card-header bg-dark text-white">
                        Service title
                    </div>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Service subtitle</h5>
                        <p className="card-text mb-3">Booking description - Lorem ipsum dolor sit amet consectetur. Feugiat morbi enim etiam gravida non vitae. Est amet risus sagittis nisi nunc facilisi dapibus placerat sed. Vel eget bibendum nisl etiam. Suspendisse magna natoque adipiscing a fermentum amet vulputate elementum mi. Netus mi eget tortor amet vitae egestas. Dolor amet libero a sit vestibulum eget non duis nec.</p>
                        <p><strong>Service address: </strong>100 Pantomine Boulevard, Brampton, Ontario, L6Y5N4</p>
                        <p><strong>Date: </strong>2023-03-23</p>
                        <p><strong>Provider: </strong>Provider name</p>
                        <span className="btn btn-primary btn-service-master-bg text-dark mr-3" onClick={(e) => document.getElementById('date-field-container')?.classList.remove('d-none')}>Request reschedule</span>
                        <a href="#" className="btn btn-danger text-white">Cancel booking</a>
                        <div className={`form-group my-4 d-none`} id="date-field-container">
                            <label htmlFor="date-field" className="mb-3 input-label">Suggested date</label>
                            <input
                                name="booking_date"
                                type="datetime-local"
                                className={`form-control input-field`}
                                onChange={handleChange}
                                id='date-field' />
                            <span className='btn btn-primary btn-service-master-bg text-dark mt-3' onClick={(e) => document.getElementById('date-field-container')?.classList.add('d-none')}>Reschedule</span>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default Bookings;

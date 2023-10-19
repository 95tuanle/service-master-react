import {useContext, useEffect, useState} from "react";
import APIContext from "../context/APIContext";
import axios from "axios";
import {CustomerString, ProviderString} from "../Utilities";

interface Booking {
  booking: any;
  service: any;
  customer: any;
  provider: any;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const url = useContext(APIContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response: any;
        if (localStorage.getItem("user_type") === ProviderString) {
          response = await axios.get(url + "/booking/provider", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
          });
        } else if (localStorage.getItem("user_type") === CustomerString) {
          response = await axios.get(url + "/booking/customer", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
          });
        }
        setBookings(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error: any) {
        console.error(error.response.data);
        alert(JSON.stringify(error.response.data));
      }
    };
    fetchData().then(() => {
    });
  }, [url]);

  const [inputs, setInputs] = useState({
    booking_date: Date,
  });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({...values, [name]: value}));
  };

  const handleReschedule = async (id: String) => {
    if (inputs.booking_date === null) {
      alert("input must not be empty");
    } else {
      try {
        const response = await axios.put(`${url}/booking/date/${id}`, {
          booking_date: inputs.booking_date,
        }, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
        console.log(response.data);
        const updatedBookings = bookings.map(booking => booking.booking._id === response.data._id ? ({
          ...booking,
          booking: response.data
        }) : (booking));
        setBookings(updatedBookings);
        console.log(bookings);
        alert('Rescheduled');
      } catch (error: any) {
        console.error(error.response.data);
        alert(JSON.stringify(error.response.data));
      }
    }
  };

  const handleDelete = async (id: String) => {
    try {
      await axios.delete(`${url}/booking/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
      const updatedBookings = bookings.filter(booking => booking.booking._id !== id);
      setBookings(updatedBookings);
    } catch (error: any) {
      console.error(error.response.data);
      alert(JSON.stringify(error.response.data));
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        bookings.map(booking => (
          <div className="card mb-4" key={booking.booking._id}>
            <div className="card-header bg-dark text-white">
              {booking.service.name}
            </div>
            <div className="card-body">
              <p className="card-text mb-3">{booking.service.description}</p>
              <p><strong>Description: </strong>{booking.booking.booking_description}</p>
              <p><strong>Address: </strong>{booking.booking.booking_address}</p>
              <p><strong>Date: </strong>{new Date(booking.booking.booking_date).toLocaleString()}</p>
              <p>
                <strong>{localStorage.getItem("user_type") === ProviderString ? "Customer" : "Provider"}: </strong>{booking.provider}
              </p>
              <span className="btn btn-primary btn-service-master-bg text-dark mr-3" onClick={() => {
                document.getElementById('date-field-container' + booking.booking._id)?.classList.remove('d-none');
              }}>Reschedule</span>
              <span onClick={() => handleDelete(booking.booking._id)}
                    className="btn btn-danger text-white">Cancel</span>
              <div className={`form-group my-4 d-none`} id={'date-field-container' + booking.booking._id}>
                <label htmlFor="date-field" className="mb-3 input-label">New date</label>
                <input
                  name="booking_date"
                  type="datetime-local"
                  className={`form-control input-field`}
                  onChange={handleChange}
                  id='date-field'/>
                <span className='btn btn-primary btn-service-master-bg text-dark mt-3' onClick={(e) => {
                  document.getElementById('date-field-container' + booking.booking._id)?.classList.add('d-none');
                  handleReschedule(booking.booking._id).then(() => {
                  })
                }}>Reschedule</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Bookings;

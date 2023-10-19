import React from 'react';

const Home = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid text-center bg-light">
        <div className="container">
          <h1 className="display-4">Welcome to Service Master</h1>
          <p className="lead">Your one-stop solution for home renovation services</p>
          <a href="#services" className="btn btn-outline-dark btn-lg">Explore Our Services</a>
        </div>
      </div>

      <div id="services" className="container-fluid py-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row justify-content-center">
          <div className="col-md-4 col-sm-6 text-center mb-4">
            <i className="fas fa-paint-roller fa-3x"></i>
            <h4 className="mt-2">Painting</h4>
          </div>
          <div className="col-md-4 col-sm-6 text-center mb-4">
            <i className="fas fa-tools fa-3x"></i>
            <h4 className="mt-2">Flooring</h4>
          </div>
          <div className="col-md-4 col-sm-6 text-center mb-4">
            <i className="fas fa-wrench fa-3x"></i>
            <h4 className="mt-2">Plumbing</h4>
          </div>
          <div className="col-md-4 col-sm-6 text-center mb-4">
            <i className="fas fa-lightbulb fa-3x"></i>
            <h4 className="mt-2">Electrical Work</h4>
          </div>
          <div className="col-md-4 col-sm-6 text-center mb-4">
            <i className="fas fa-cogs fa-3x"></i>
            <h4 className="mt-2">Maintenance & Repairs</h4>
          </div>
          <div className="col-md-4 col-sm-6 text-center mb-4">
            <i className="fas fa-hammer fa-3x"></i>
            <h4 className="mt-2">Remodeling</h4>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Easy Booking</h2>
              <p>Our seamless booking process allows you to quickly and easily schedule a service
                appointment at a time that works best for you. Simply select the service you need,
                choose a date and time, and sit back and relax while Service Master takes care of the
                rest. You can also track the status of your service appointment and receive real-time
                updates on the progress of your renovation.</p>
            </div>
            <div className="col-md-6">
              <h2>Transparent Pricing</h2>
              <p>Service Master offers competitive pricing, with transparent and upfront quotes for all
                services. You can trust that you're getting the best value for your money, without any
                hidden fees or surprises.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <h2>Professional & Reliable Services</h2>
              <p>With Service Master, you can rest assured that your home renovation project is in good
                hands. Our team of skilled professionals is dedicated to providing high-quality,
                efficient, and reliable services to meet all of your renovation needs.</p>
            </div>
            <div className="col-md-6 order-md-1">
              <h2>Customer Satisfaction</h2>
              <p>Our top priority is customer satisfaction. We work closely with you to understand your
                requirements and ensure that every aspect of your renovation project exceeds your
                expectations. Try Service Master today and see the difference for yourself.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center py-5">
        <h2 className="mb-4">Ready to Transform Your Home?</h2>
        <p className="lead">Book a service appointment with Service Master and let our experts take care of your
          home renovation needs.</p>
      </div>
    </>
  )
}
export default Home;


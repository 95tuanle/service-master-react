
const Footer = () => {
    return (
        <footer className="text-center text-lg-start  footer-bg">
            <div className="p-4 pb-0">
                <section>
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">
                                Service Master
                            </h6>
                            <p>
                                {/*Service Master is a user-friendly application that allows homeowners to easily book house renovating services. Whether you're looking to update your kitchen, bathroom, or any other part of your home, Service Master has got you covered. With a wide range of services to choose from, including painting, flooring, plumbing, electrical work, and more, you can trust that your renovation needs will be met with expertise and professionalism.*/}

                                {/*The app offers a seamless booking process, allowing you to quickly and easily schedule a service appointment at a time that works best for you. Simply select the service you need, choose a date and time that works for you, and sit back and relax while Service Master takes care of the rest. You can also track the status of your service appointment and receive real-time updates on the progress of your renovation.*/}

                                {/*Service Master also offers competitive pricing, with transparent and upfront quotes for all services. You can trust that you're getting the best value for your money, without any hidden fees or surprises.*/}

                                {/*With Service Master, you can rest assured that your home renovation project is in good hands. Our team of skilled professionals is dedicated to providing high-quality, efficient, and reliable services to meet all of your renovation needs. Try Service Master today and see the difference for yourself.*/}
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none" />
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i>1205 Humber College Blvd, Toronto, ON M9W 5L7</p>
                            <p><i className="fas fa-envelope mr-3"></i>enquiry@humber.ca</p>
                            <p><i className="fas fa-phone mr-3"></i>+1-416-675-3111</p>
                        </div>
                    </div>
                </section>

                <hr className="my-3" />
                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            <div className="p-3">
                                Swapnil Roy Chowdhury - N01469281
                                | Nguyen Anh Tuan Le - N01414195
                                | Mihir Deshpande - N01471808
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
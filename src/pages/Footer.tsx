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
                Service Master is a web application that allows users to find and book services from
                local service providers.
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none"/>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p><i className="fas fa-home mr-3"></i>1205 Humber College Blvd, Toronto, ON M9W 5L7</p>
              <p><i className="fas fa-envelope mr-3"></i>enquiry@humber.ca</p>
              <p><i className="fas fa-phone mr-3"></i>+1-416-675-3111</p>
            </div>
          </div>
        </section>

        <hr className="my-3"/>
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
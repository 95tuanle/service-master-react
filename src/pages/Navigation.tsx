import {NavLink, useNavigate} from "react-router-dom";

import ServiceMasterLogo from '../assets/images/service-master-logo.png';
import {AdminString, CustomerString, ProviderString} from "../Utilities";

const Navigation = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear()
    navigate("/");
  };

  return (
    <header className='mb-5'>
      <nav className="navbar navbar-expand-lg navbar-dark header-bg scrolling-navbar py-2">
        <NavLink className="navbar-brand text-dark " to='/'>
          <img src={ServiceMasterLogo} alt="my-little-tribe-logo" className='w-75'/>
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto fw-bold">
            {localStorage.getItem("token") ? (
              <>
                {localStorage.getItem("user_type") === AdminString && (<>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/admin/users'>Users</NavLink>
                  </li>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/admin/add-service'>Add
                    service</NavLink></li>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/admin/services'>Services</NavLink>
                  </li>
                </>)}
                {localStorage.getItem("user_type") === CustomerString && (<>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/customer/services'>Services</NavLink>
                  </li>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/customer/bookings'>Bookings</NavLink>
                  </li>
                </>)}
                {localStorage.getItem("user_type") === ProviderString && (<>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/provider/services'>Services</NavLink>
                  </li>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/provider/registered-services'>Registered
                    Services</NavLink></li>
                  <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                   to='/provider/bookings'>Bookings</NavLink>
                  </li>
                </>)}
                <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/'
                                                                 onClick={signOut}>Sign out
                  of {localStorage.getItem("user_name")}</NavLink></li>
              </>
            ) : (
              <>
                <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                 to='/sign-up'>Sign up</NavLink></li>
                <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark"
                                                                 to='/sign-in'>Sign in</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
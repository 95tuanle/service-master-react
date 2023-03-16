import {NavLink} from "react-router-dom";

import ServiceMasterLogo from '../assets/images/service-master-logo.png';
import UserContext from "../context/UserContext";
import {useContext} from "react";
import {AdminString, CustomerString, ProviderString} from "../Utilities";

interface Props {
    setUser: (user: any) => void
}
const Navigation = ({setUser}: Props) => {
    const user = useContext(UserContext);
    const signOut = () => {
        localStorage.removeItem("token")
        setUser(null);
    };

    return (
        <header className='mb-5'>
            <nav className="navbar navbar-expand-lg navbar-dark header-bg scrolling-navbar py-2">
                <NavLink className="navbar-brand text-dark " to='/'>
                    <img src={ServiceMasterLogo} alt="my-little-tribe-logo" className='w-75' />
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto fw-bold">
                        {localStorage.getItem("token") ? (
                            <>
                                {user?.type === AdminString && (<>
                                    {/*<li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/users'>Users</NavLink></li>*/}
                                    {/*<li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/add-service'>Add Service</NavLink></li>*/}
                                    {/*<li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/list-services'>Services</NavLink></li>*/}
                                </>)}
                                {user?.type === CustomerString && (<>

                                </>)}
                                {user?.type === ProviderString && (<>

                                </>)}
                                <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/' onClick={signOut}>Sign Out</NavLink></li>
                            </>
                            ) : (
                            <>
                                <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/sign-up'>Sign Up</NavLink></li>
                                <li className="nav-item active mr-sm-3"><NavLink className="nav-link text-dark" to='/sign-in'>Sign In</NavLink></li>
                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
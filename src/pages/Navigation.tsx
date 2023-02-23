import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/users'>Users</NavLink></li>
                <li><NavLink to='/add-service'>Add Service</NavLink></li>
                <li><NavLink to='/list-services'>Services</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navigation;
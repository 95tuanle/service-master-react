import {Navigate, Outlet} from 'react-router-dom';
import {CustomerString} from "../../Utilities";

const CustomerRoute = () => {
    if (localStorage.getItem("user_type") === CustomerString) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet />;
};
export default CustomerRoute;

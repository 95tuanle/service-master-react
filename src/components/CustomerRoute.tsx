import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from "react";
import UserContext from "../context/UserContext";
import {CustomerString} from "../Utilities";

const CustomerRoute = () => {
    const user = useContext(UserContext);
    if (user?.type !== CustomerString) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet />;
};
export default CustomerRoute;

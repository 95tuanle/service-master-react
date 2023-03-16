import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from "react";
import UserContext from "../context/UserContext";
import {AdminString} from "../Utilities";

const AdminRoute = () => {
    const user = useContext(UserContext);
    if (user?.type !== AdminString) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet />;
};
export default AdminRoute;
import {Navigate, Outlet} from 'react-router-dom';
import {AdminString} from "../../Utilities";

const AdminRoute = () => {
    if (localStorage.getItem("user_type") !== AdminString) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet/>;
};
export default AdminRoute;
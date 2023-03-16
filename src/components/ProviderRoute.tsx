import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from "react";
import UserContext from "../context/UserContext";

const ProviderRoute = () => {
    const user = useContext(UserContext);
    if (user?.type !== ProviderRoute) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet />;
};
export default ProviderRoute;
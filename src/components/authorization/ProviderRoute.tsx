import {Navigate, Outlet} from 'react-router-dom';
import {ProviderString} from "../../Utilities";

const ProviderRoute = () => {
    if (localStorage.getItem("user_type") !== ProviderString) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet/>;
};
export default ProviderRoute;
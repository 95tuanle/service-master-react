import {Navigate, Outlet} from 'react-router-dom';

const SignedOutRoute = () => {
    if (localStorage.getItem("token")) {
        return <Navigate to='/' replace/>;
    }
    return <Outlet/>;
};
export default SignedOutRoute;

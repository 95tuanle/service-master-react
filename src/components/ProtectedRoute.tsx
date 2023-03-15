import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    if (!localStorage.getItem("token")) {
        return <Navigate to='sign-in' replace/>;
    }
    return <Outlet />;
};
export default ProtectedRoute;

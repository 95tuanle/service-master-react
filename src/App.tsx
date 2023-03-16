import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useContext, useState} from 'react';
import './App.css';

import Navigation from './pages/Navigation';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import APIContext from "./context/APIContext";
import Footer from './pages/Footer';
import SignedInRoute from "./components/authentication/SignedInRoute";
import SignedOutRoute from "./components/authentication/SignedOutRoute";
import AdminRoute from "./components/authorization/AdminRoute";
import CustomerRoute from "./components/authorization/CustomerRoute";
import ProviderRoute from "./components/authorization/ProviderRoute";
import AddService from "./pages/AddService";
import UpdateUser from "./pages/UpdateUser";
import ListServices from "./pages/ListServices";
import Users from "./pages/Users";


export interface UserType {
    _id: any;
    first_name: any;
    last_name: any;
    password: any;
    email: any;
    type: any;
}

function App() {
    const [users, setUsers] = useState<UserType[]>([]);
    // const [user, setUser] = useState<UserType | null>(null);
    const url = useContext(APIContext);
    // useEffect(() => {
    //     if (user == null && localStorage.getItem("token")) {
    //         axios.get(url + '/user/current', {
    //             headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    //         }).then(response => {
    //             setUser(response.data);
    //             console.log(response.data);
    //         }).catch(error => {
    //             console.error(error.response.data);
    //             alert(JSON.stringify(error.response.data))})
    //     }
    // })

    return (
        <>
            <APIContext.Provider value={url}>
                <Navigation/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route element={<SignedOutRoute/>}>
                        <Route path='sign-up' element={<SignUp/>}/>
                        <Route path='sign-in' element={<SignIn/>}/>
                    </Route>
                    <Route element={<SignedInRoute/>}>
                        <Route element={<AdminRoute/>}>
                            <Route path='users' element={<Users setUsers={setUsers} users={users}/>} />
                            <Route path='update/:_id' element={<UpdateUser setUsers={setUsers} users={users}/>} />
                            <Route path='add-service' element={<AddService/>}/>
                            <Route path='list-services' element={<ListServices/>} />
                        </Route>
                        <Route element={<CustomerRoute/>}>

                        </Route>
                        <Route element={<ProviderRoute/>}>

                        </Route>
                    </Route>
                    <Route path='*' element={<h1>Oops! Route not found</h1>}/>
                </Routes>
                <Footer/>
            </APIContext.Provider>
        </>
    );
}

export default App;
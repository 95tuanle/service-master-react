import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useContext, useEffect, useState} from 'react';
import './App.css';

import Navigation from './pages/Navigation';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import APIContext from "./context/APIContext";
import UserContext, {UserType} from "./context/UserContext";
import Footer from './pages/Footer';
import SignedInRoute from "./components/SignedInRoute";
import SignedOutRoute from "./components/SignedOutRoute";
import AdminRoute from "./components/AdminRoute";
import CustomerRoute from "./components/CustomerRoute";
import ProviderRoute from "./components/ProviderRoute";
import AddService from "./components/AddService";
import axios from "axios";
import UpdateUser from "./pages/UpdateUser";
import ListServices from "./components/ListServices";
import Users from "./pages/Users";


function App() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [user, setUser] = useState<UserType | null>(null);
    const url = useContext(APIContext);
    useEffect(() => {
        if (user == null && localStorage.getItem("token")) {
            axios.get(url + '/user/current', {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            }).then(response => {
                setUser(response.data);
                console.log(response.data);
            }).catch(error => {
                console.error(error);
                alert(JSON.stringify(error))})
        }
    })

    return (
        <>
            <APIContext.Provider value={url}>
                <UserContext.Provider value={user}>
                    <Navigation setUser={setUser}/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route element={<SignedOutRoute/>}>
                            <Route path='sign-up' element={<SignUp/>}/>
                            <Route path='sign-in' element={<SignIn setUser={setUser}/>}/>
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
                </UserContext.Provider>
            </APIContext.Provider>
        </>
    );
}

export default App;
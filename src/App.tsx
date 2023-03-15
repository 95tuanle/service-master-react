import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from 'react';
import './App.css';

import Navigation from './pages/Navigation';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Users from './pages/Users';
import UpdateUser from './pages/UpdateUser';
import APIContext from "./context/APIContext";
import ListServices from "./components/ListServices";
import AddService from "./components/AddService";
import Footer from './pages/Footer';
import ProtectedRoute from "./components/ProtectedRoute";


interface UserType {
    _id: any;
    first_name: any;
    last_name: any;
    password: any;
    email: any;
    type: any;
}

function App() {
    const [users, setUsers] = useState<UserType[]>([]);

    return (
        <>
            <APIContext.Provider value={'https://service-master-api.cyclic.app'}>
                <Navigation/>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='sign-up' element={<SignUp/>} />
                    <Route path='sign-in' element={<SignIn/>} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='users' element={<Users setUsers={setUsers} users={users}/>} />
                        <Route path='update/:_id' element={<UpdateUser setUsers={setUsers} users={users}/>} />
                        <Route path='add-service' element={<AddService/>} />
                        <Route path='list-services' element={<ListServices/>} />
                    </Route>
                    <Route path='*' element={<h1>Oops! Route not found</h1>} />
                </Routes>
                <Footer />
            </APIContext.Provider>
        </>
    );
}

export default App;
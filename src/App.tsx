import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useContext, useState} from 'react';
import './App.css';

import Navigation from './pages/Navigation';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Book from './pages/Book';
import Bookings from './pages/Bookings';
import APIContext from "./context/APIContext";
import Footer from './pages/Footer';
import SignedInRoute from "./components/authentication/SignedInRoute";
import SignedOutRoute from "./components/authentication/SignedOutRoute";
import AdminRoute from "./components/authorization/AdminRoute";
import CustomerRoute from "./components/authorization/CustomerRoute";
import ProviderRoute from "./components/authorization/ProviderRoute";
import AddService from "./pages/AddService";
import UpdateUser from "./pages/UpdateUser";
import Services from "./pages/Services";
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
    const url = useContext(APIContext);

    return (
        <APIContext.Provider value={url}>
            <Navigation/>
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route element={<SignedOutRoute/>}>
                        <Route path='sign-up' element={<SignUp/>}/>
                        <Route path='sign-in' element={<SignIn/>}/>
                    </Route>
                    <Route element={<SignedInRoute/>}>
                        <Route element={<AdminRoute/>}>
                            <Route path='admin/users' element={<Users setUsers={setUsers} users={users}/>} />
                            <Route path='admin/update-user/:_id' element={<UpdateUser setUsers={setUsers} users={users}/>} />
                            <Route path='admin/add-service' element={<AddService/>}/>
                            <Route path='admin/services' element={<Services/>} />
                        </Route>
                        <Route element={<CustomerRoute/>}>
                            <Route path='customer/services' element={<Services/>} />
                            <Route path='customer/bookings' element={<Bookings/>} />
                            <Route path='customer/book' element={<Book />} />
                        </Route>
                        <Route element={<ProviderRoute/>}>

                        </Route>
                    </Route>
                    <Route path='*' element={<h1>Oops! Route not found</h1>}/>
                </Routes>
            </div>
            <Footer/>
        </APIContext.Provider>
    );
}

export default App;
import React, {useState} from 'react';
import './App.css';

import Navigation from './pages/Navigation';
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Users from './pages/Users';
import UpdateUser from './pages/UpdateUser';
import APIContext from "./context/APIContext";
import TokenContext from "./context/TokenContext";
import ListServices from "./components/ListServices";
import AddService from "./components/AddService";

interface UserType {
    _id: any;
    first_name: any;
    last_name: any;
    password: any;
    email: any;
    type: any;
}

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [users, setUsers] = useState<UserType[]>([]);

    const updateToken = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    return (
        <>
            <APIContext.Provider value={'https://service-master-api.cyclic.app'}>
                <TokenContext.Provider value={token!}>
                    <Navigation/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login updateToken={updateToken}/>} />
                        <Route path='/users' element={<Users setUsers={setUsers} users={users}/>} />
                        <Route path='/update/:_id' element={<UpdateUser setUsers={setUsers} users={users}/>} />
                        <Route path='/add-service' element={<AddService/>} />
                        <Route path='/list-services' element={<ListServices/>} />
                        <Route path='*' element={<h1>404</h1>} />
                    </Routes>
                </TokenContext.Provider>
            </APIContext.Provider>
        </>
    );
}

export default App;
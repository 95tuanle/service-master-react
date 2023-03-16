import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from 'react';
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


function App() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [user, setUser] = useState<UserType | null>(null);

    return (
        <>
            {/*<APIContext.Provider value={'https://service-master-api.cyclic.app'}>*/}
            <APIContext.Provider value={'http://localhost:3000'}>
                <UserContext.Provider value={user}>
                    <Navigation setUser={setUser}/>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route element={<SignedOutRoute/>}>
                            <Route path='sign-up' element={<SignUp/>} />
                            <Route path='sign-in' element={<SignIn setUser={setUser}/>} />
                        </Route>
                        <Route element={<SignedInRoute/>}>
                            <Route element={<AdminRoute/>}>
                                {/*<Route path='users' element={<Users setUsers={setUsers} users={users}/>} />*/}
                                {/*<Route path='update/:_id' element={<UpdateUser setUsers={setUsers} users={users}/>} />*/}
                                {/*<Route path='add-service' element={<AddService/>} />*/}
                                {/*<Route path='list-services' element={<ListServices/>} />*/}
                            </Route>
                            <Route element={<CustomerRoute/>}>

                            </Route>
                            <Route element={<ProviderRoute/>}>

                            </Route>
                        </Route>
                        <Route path='*' element={<h1>Oops! Route not found</h1>} />
                    </Routes>
                    <Footer />
                </UserContext.Provider>
            </APIContext.Provider>
        </>
    );
}

export default App;
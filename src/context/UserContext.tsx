import {createContext} from "react";

export interface UserType {
    _id: any;
    first_name: any;
    last_name: any;
    password: any;
    email: any;
    type: any;
}

const UserContext = createContext<UserType | null>(null);

export default UserContext
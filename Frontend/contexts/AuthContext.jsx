import { Children, createContext, useContext, useState } from "react";
import axios, { HttpStatusCode } from  'axios';
import httpStatus from 'http-status'
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext({});

const client = axios.create({
    baseURL: 'http://localhost:5000/api/v1/users'
    
})

export const AuthProvider = ({Children}) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);


    const handleRegister = async(name, username, password) => {
        try {
            let request = await client.post('/register', {
                name: name,
                username: username,
                password: password
            })

            if(request.status ===httpStatus.CREATED){
                return request.data.message;
            }
            
        } catch (error) {
            throw error
        }
    }

    const router = useNavigate();

    const data = {
        userData, setUserData, handleRegister
    }

    return (
        <AuthContext.Provider value={data}>
            {Children}
        </AuthContext.Provider>
    )
}

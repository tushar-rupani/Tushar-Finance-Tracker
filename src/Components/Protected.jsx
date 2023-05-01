import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { get } from '../Services/localstorage.service';

const Protected = () => {
    let token = get("token");
    return token ? <Outlet /> : <Navigate to="/" /> 
}

export default Protected

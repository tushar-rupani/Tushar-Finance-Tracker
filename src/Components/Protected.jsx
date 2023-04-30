import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
    const [authenticated, setAuthenticated] = useState(false);
    return authenticated ? <Outlet /> : <Navigate to="/" /> 
}

export default Protected

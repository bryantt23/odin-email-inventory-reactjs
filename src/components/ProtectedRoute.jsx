import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../../utils/token'

const ProtectedRoute = () => {
    const token = getToken()

    return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
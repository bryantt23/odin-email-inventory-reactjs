import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getLocalStorageItem } from '../../utils/localStorage'

const ProtectedRoute = () => {
    const token = getLocalStorageItem('token')

    return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
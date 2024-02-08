import React from 'react'

export default function PublicRoutes({ children }) {
    if (!localStorage.getItem('token')) {
        return children
    }
    return <Navigate to='/' />
}

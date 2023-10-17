import { AuthContext } from '../context/authContext'
import { useContext } from 'react'

export const useAuthCOntext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider')
    }
    return context
}
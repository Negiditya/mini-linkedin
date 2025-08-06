import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/auth/me', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUser(res.data.user);
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                setUser(null);
            }

        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout', {}, { withCredentials: true });
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setUser(null);
        }
    };

    const login = async (userData) => {
        setUser(userData);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                login,
                refreshUser: fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};




import React, { useState, createContext, useEffect } from "react";

import authService from "./auth.service";
import {LoadingContainer} from "../../components/utils/LoadingContainer";
import Auth from "../../features/authentication/screens/auth.screen";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const getLogin = async() => {
        const autlog = await authService.isLoggedIn();
        setIsLoggedIn(autlog);
    }

    useEffect(() => {
        getLogin()
    }, [])

    const refreshToken = (newJwt) => {
        authService.setJWT(newJwt);
        setIsLoggedIn(newJwt != null);
    }

    if (isLoggedIn == null){
        return (
            <>
                <LoadingContainer/>
            </>
        );
    }

    if (isLoggedIn === false) {
        return (
            <>
                <Auth token={refreshToken}/>
            </>
        )
    }

    return (
        <AuthContext.Provider value={{ refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

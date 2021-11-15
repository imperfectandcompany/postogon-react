import axios from 'axios';
import { resolve } from 'path';
import React, { useEffect } from 'react';
import API from './utils/API';
import { getToken } from './utils/Common';
import { setLoginDetails, setUserToken } from './utils/Login';

//create context
export const Context = React.createContext<any>(undefined);


/**
 * Authentication/Authorization context for managing
 * authenticating/ed and authorizing/ed users
 */
export const AuthProvider: React.FC = ({ children }) => {

    const [authValues, setAuthValues] = React.useState({
        authenticated: false,
        user: null,
    });

    useEffect(() => {
        verify();
      }, []);

    // handle button click of login form
    const login = ({ user, password }: { user: string; password: string }) => {
        return new Promise((resolve) => {
            axios.post('https://api.postogon.com/auth', { username: user, password: password }).then(response => {
                const details = JSON.parse(JSON.stringify(response.data));
                setLoginDetails(JSON.stringify(response.data));
                setAuthValues({
                    authenticated: true,
                    user: details['Uid'],
                });
                resolve(true);
            }).catch(error => {
                resolve(false);
            });
        });
    };

    // handle account verification
    const verify = () => {
        return new Promise((resolve) => {
            const token = getToken();
            if (!token) {
                return;
            }
            API.get(`verifyToken?token=${token}`).then((response: { data: JSON; }) => {
                const details = JSON.parse(JSON.stringify(response.data));
                setLoginDetails(JSON.stringify(response.data));
                setAuthValues({
                    authenticated: true,
                    user: details['Uid'],
                });
                resolve(true);
            }).catch(error => {
                setAuthValues({
                    authenticated: false,
                    user: null,
                });
                resolve(false);
            });
        });
    };

    // handle button click of logout form
    const logout = () => {
        setAuthValues({
            authenticated: false,
            user: null,
        });
        return Promise.resolve(true);
    };

    let state = {
        authValues,
        login,
        logout,
        verify,
    };

    return <Context.Provider value={state}>{children}</Context.Provider>
};

export default Context;
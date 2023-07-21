import React, { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../models/User";
import Cookies from "js-cookie";

interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext({} as UserContextType);

interface UserProviderProps {
    children?: React.ReactNode
}

export function UserProvider (props: UserProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = Cookies.get('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            Cookies.set('user', JSON.stringify(user), { expires: 7 });
        } else {
            Cookies.remove('user');
        }
    }, [user]);

    const contextValue = useMemo(() => ({
        user, setUser
    }), [user, setUser]);

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
}
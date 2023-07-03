import React, { createContext, useMemo, useState } from "react";
import { User } from "../models/User";

interface UserContextType {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext({} as UserContextType);

interface UserProviderProps {
    children?: React.ReactNode
}

export function UserProvider (props: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const contextValue = useMemo(() => ({
        user, setUser
    }), [user, setUser]);

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
}
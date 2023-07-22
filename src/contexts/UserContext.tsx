import React, { createContext, useEffect, useMemo, useState } from "react";
import { User } from "../models/User";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
  }
  
  export const UserContext = createContext({} as UserContextType);
  
  interface UserProviderProps {
    children?: React.ReactNode;
  }
  
  export function UserProvider(props: UserProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }, [user]);
  
    const contextValue = useMemo(() => ({
      user,
      setUser,
    }), [user, setUser]);
  
    return (
      <UserContext.Provider value={contextValue}>
        {props.children}
      </UserContext.Provider>
    );
  }
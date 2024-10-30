import React, { createContext } from "react";

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthFunctions {
  signIn(token: string): any;
  signOut(): any;
}

interface AuthContextType {
  authFunctions: AuthFunctions;
  userInfo: UserInfo;
}

interface HomeFunctions {
  storeSubmitTime(time: number): any;
}

export const AuthContext = createContext<AuthContextType>({
  authFunctions: {
    signIn: (token: string) => {},
    signOut: () => {},
  },
  userInfo: { email: "", firstName: "", lastName: "" },
});

export const WelcomeContext = createContext({
  isFirstTime: false,
  setIsFirstTime: (update: boolean) => {},
});

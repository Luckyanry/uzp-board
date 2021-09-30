import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import {getUser, signIn as sendSignInRequest} from "../api/auth";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
  const [user, setUser] = useState();

  const signIn = useCallback(async (login, password) => {
    const result = await sendSignInRequest(login, password);

    const {isOk, data} = result;

    if (isOk) {
      setUser(() => data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser();
    sessionStorage.clear();
    window.location.href = "#/login";
    window.location.reload();
  }, []);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      const {isOk, data} = result;

      if (isOk) {
        setUser(() => data);
      }
    })();
  }, [signIn]);

  return <AuthContext.Provider value={{user, signIn, signOut}} {...props} />;
}

export {AuthProvider, useAuth};

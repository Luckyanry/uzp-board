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
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (login, password) => {
    const result = await sendSignInRequest(login, password);

    if (result.isOk) {
      setUser(result.data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser();
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      console.log(`AuthProvider (Auth.js) result request: `, result);
      if (result.isOk) {
        console.log(`Auth.js result.data`, result.data);
        setUser(result.data);
      }

      setLoading(false);
    })();
  }, [signIn]);

  return (
    <AuthContext.Provider value={{user, signIn, signOut, loading}} {...props} />
  );
}

export {AuthProvider, useAuth};

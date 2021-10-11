import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import {useHistory} from "react-router-dom";

import {getUser, logOff, signIn as sendSignInRequest} from "../api/auth";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
  const [user, setUser] = useState();

  const history = useHistory();

  useEffect(() => {
    (async function () {
      const result = await getUser();
      const {isOk, data} = result;

      if (isOk) {
        setUser(() => data);
      }
    })();
  }, []);

  const signIn = useCallback(async (login, password) => {
    const result = await sendSignInRequest(login, password);

    const {isOk, data} = result;

    if (isOk) {
      setUser(() => data);
    }

    return result;
  }, []);

  const signOut = useCallback(async () => {
    await logOff();

    setUser();
    sessionStorage.clear();
    history.push("/login");

    // window.location.reload();
  }, [history]);

  return <AuthContext.Provider value={{user, signIn, signOut}} {...props} />;
}

export {AuthProvider, useAuth};

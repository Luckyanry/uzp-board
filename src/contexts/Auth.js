import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import {getUser, signIn as sendSignInRequest} from "../api/auth";
import {Spinner} from "../components";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (login, password) => {
    setLoading(true);

    const result = await sendSignInRequest(login, password);
    const {isOk, data} = result;

    setLoading(false);

    if (isOk) {
      setUser(() => data);
    }

    return result;
  }, []);

  const signOut = useCallback(() => {
    setUser();
    sessionStorage.clear();
    window.location.reload();
  }, []);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const result = await getUser();
      const {isOk, data} = result;

      setLoading(false);

      if (isOk) {
        setUser(() => data);
      }
    })();
  }, [signIn]);

  return loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : (
    <AuthContext.Provider value={{user, signIn, signOut, loading}} {...props} />
  );
}

export {AuthProvider, useAuth};

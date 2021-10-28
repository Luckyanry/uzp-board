import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import {useHistory} from "react-router-dom";

import {getUser, logOff, signIn as sendSignInRequest} from "../api/auth";
import {FetchData} from "../api/pages-fetch";
import {siteStructureArr} from "../routes/app-routes";

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

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log("Auth useEffect");
    const fetchData = FetchData(
      "/siteStructure",
      // "ShortDicsRecordsFlat&@name=SiteStructure",
      // "hbdb"
      "wwwSiteStructure",
      "wisdb"
    ).fetchColumnsSchemaData;

    fetchData
      .load()
      .then(({data}) =>
        sessionStorage.setItem("siteStructure", JSON.stringify(data))
      );

    // eslint-disable-next-line
  }, [user]);

  const signIn = useCallback(async (login, password) => {
    const result = await sendSignInRequest(login, password);
    console.log("Auth");
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

    window.location.reload();
  }, [history]);

  return <AuthContext.Provider value={{user, signIn, signOut}} {...props} />;
}

export {AuthProvider, useAuth};

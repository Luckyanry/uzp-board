import React, {useState, useContext, useEffect, createContext} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as uzLatnMessages from "devextreme/localization/messages/uz-Latn.json";
import * as uzCyrlMessages from "devextreme/localization/messages/uz-Cyrl.json";

// import {getSystemDictionary} from "../app-localization";
import {FetchData} from "../api/pages-fetch";
import {urlAnonymous} from "../api/url-config";
import {ErrorPopup, Spinner} from "../components";

const LocalizationContext = createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);

  const [langData, setLangData] = useState([]);
  const [defaultLang, setDefaultLang] = useState("en");
  const [lang, setLang] = useState(getFromLocalStorage(defaultLang));
  // const [lang, setLang] = useState("en");
  const [customMessagesData, setCustomMessagesData] = useState({});
  const [newLocalKey, setNewLocalKey] = useState(null);

  initMessages();

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    !ignore &&
      (async () => {
        const loadLangsData = FetchData(
          "/islang",
          "islang",
          "wisdb",
          urlAnonymous
        ).fetchColumnsSchemaData;

        const result = await loadLangsData
          ._loadFunc()
          .then((res) => res.data)
          .catch((err) => {
            // console.log(`islang err `, err);
            setErrorStatus(err);
          });

        isEnabledLang(result);
        isDefaultLang(result);
        isCurrentLang(result);

        setLoading(false);
      })();

    function isEnabledLang(array) {
      if (array.length) {
        const result = array.filter(({isenabled}) => isenabled);
        setLangData(() => result);
      }
    }

    function isCurrentLang(array) {
      if (array.length) {
        const {short} = array.find(({iscurrent}) => iscurrent);

        const storage = sessionStorage.getItem("language");

        if (!storage) return;

        setLang(() => short);
        setToLocalStorege(short);
      }
    }

    function isDefaultLang(array) {
      if (array.length) {
        const result = array.find(({isdefault}) => isdefault);
        setDefaultLang(result.short);

        const storage = sessionStorage.getItem("language");

        if (storage) return;

        changeLocale(result.short);
      }
    }

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    !ignore &&
      (async () => {
        const customMessages = FetchData(
          "/CustomMessages",
          "ShortDicsRecordsFlatCustomMessagesObject",
          "hbdb",
          urlAnonymous
        ).loadCustumMessageData();

        customMessages
          .then((res) => setCustomMessagesData(() => ({[lang]: res})))
          .catch((err) => {
            // console.log(`CustomMessages err `, err);
            setErrorStatus(err);
          });
      })();

    locale(lang);
    setLoading(false);

    return () => {
      ignore = true;
    };
  }, [lang]);

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    newLocalKey &&
      !ignore &&
      (async () => {
        await FetchData(
          "/w_changeMyLocaleTo",
          "w_changeMyLocaleTo",
          "wisdb",
          urlAnonymous
        ).changeMyLocalToData(newLocalKey);

        setTimeout(() => window.location.reload(), 350);
      })();

    setLoading(false);

    return () => {
      ignore = true;
    };
  }, [newLocalKey]);

  function getFromLocalStorage(defaultValue) {
    const storage = sessionStorage.getItem("language");
    return storage !== null ? storage : defaultValue;
  }

  function setToLocalStorege(language) {
    sessionStorage.setItem("language", language);
  }

  function changeLocale(value) {
    setNewLocalKey(value);
    setLang(() => value);
    setToLocalStorege(value);
  }

  function changeLocaleHendler(e) {
    changeLocale(e.value);
  }

  function initMessages() {
    loadMessages(customMessagesData);
    loadMessages(ruMessages);
    loadMessages(uzLatnMessages);
    loadMessages(uzCyrlMessages);
    // loadMessages(getSystemDictionary());
  }

  const errorMessage = errorStatus ? (
    <ErrorPopup errorState={errorStatus} popupPositionOf={"#root"} />
  ) : null;

  const spinner = loading ? (
    <Spinner loadingState={loading} positionOf={"#content"} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {!(loading || errorStatus) && (
        <LocalizationContext.Provider
          value={{
            lang,
            langData,
            changeLocaleHendler,
            locale,
            loadMessages,
            formatMessage,
          }}
        >
          {children}
        </LocalizationContext.Provider>
      )}
    </>
  );
};

export {LocalizationProvider, useLocalization};

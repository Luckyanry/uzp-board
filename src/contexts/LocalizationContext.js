import React, {useState, useContext, useEffect} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as uzLatnMessages from "devextreme/localization/messages/uz-Latn.json";

import {FetchData} from "../api/pages-fetch";
import {getDictionary} from "../app-localization";

const LocalizationContext = React.createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const [langData, setLangData] = useState([]);
  const [defaultLang, setDefaultLang] = useState("en");
  const [lang, setLang] = useState(() => getLocale());

  const islangFetch = FetchData("/islang", formatMessage).fetchData;
  const changedMyLocalFetch = FetchData(
    "/w_changeMyLocaleTo",
    formatMessage
  ).changeMyLocalToData;

  useEffect(() => {
    const getLangsData = async () => {
      const result = await islangFetch._loadFunc().then((res) => res.data);

      isEnabledLang(result);
      isDefaultLang(result);
      isCurrentLang(result);
    };

    getLangsData();
    initMessages();
    locale(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function isEnabledLang(array) {
    if (array.length) {
      const result = array.filter(({isenabled}) => isenabled);
      setLangData(result);
    }
  }

  function isCurrentLang(array) {
    if (array.length) {
      const result = array.find(({iscurrent}) => iscurrent);
      setLocale(result.short);
    }
  }

  function isDefaultLang(array) {
    if (array.length) {
      const result = array.find(({isdefault}) => isdefault);
      setDefaultLang(result.short);
    }
  }

  function getLocale() {
    const locale = sessionStorage.getItem("locale");
    return locale !== null ? locale : defaultLang;
  }

  function setLocale(locale) {
    sessionStorage.setItem("locale", locale);
  }

  function changeMyLocalTo(newKey) {
    changedMyLocalFetch._insertFunc(newKey);
  }

  function changeLocale(e) {
    changeMyLocalTo(e.value);
    setLang(e.value);
    setLocale(e.value);
    window.location.reload();
  }

  return (
    <LocalizationContext.Provider
      value={{
        lang,
        langData,
        changeLocale,
        locale,
        loadMessages,
        formatMessage,
        getDictionary,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

function initMessages() {
  loadMessages(ruMessages);
  loadMessages(uzLatnMessages);
  loadMessages(getDictionary());
}

export {LocalizationProvider, useLocalization};

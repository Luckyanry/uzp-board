import React, {useState, useContext, useEffect} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as uzLatnMessages from "devextreme/localization/messages/uz-Latn.json";

import {FetchData} from "../api/pages-fetch";
// import {getDictionary} from "../app-localization";

const LocalizationContext = React.createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const [langData, setLangData] = useState([]);
  const [customMessagesData, setCustomMessagesData] = useState({});
  const [defaultLang, setDefaultLang] = useState("en");
  const [lang, setLang] = useState(() => getLocale());

  const changedMyLocalFetch = FetchData(
    "/w_changeMyLocaleTo",
    formatMessage,
    null,
    "/w_changeMyLocaleTo",
    "wisdb"
  ).changeMyLocalToData;

  initMessages();
  // locale(lang);

  useEffect(() => {
    // let didCancel = false;

    const customMessages = FetchData(
      "/CustomMessages",
      formatMessage,
      null,
      "CustomMessages"
    ).custumMessageData;

    const getLangsData = async () => {
      const islangFetch = FetchData(
        "/islang",
        formatMessage,
        null,
        "islang",
        "wisdb"
      ).fetchColumnsSchemaData;

      const result = await islangFetch._loadFunc().then((res) => res.data);

      // if (!didCancel) {
      isEnabledLang(result);
      isDefaultLang(result);
      isCurrentLang(result);
      // }
    };

    const getCustomMessages = async () => {
      await customMessages
        ._loadFunc()
        .then((res) => setCustomMessagesData({[lang]: res}));
    };

    getCustomMessages();
    getLangsData();

    // if (!didCancel) {
    locale(lang);
    // }

    // return () => {
    //   didCancel = true;
    // };
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
    document.location.reload();
  }

  function initMessages() {
    loadMessages(ruMessages);
    loadMessages(uzLatnMessages);
    // loadMessages(getDictionary());
    loadMessages(customMessagesData);
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
        // getDictionary,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export {LocalizationProvider, useLocalization};

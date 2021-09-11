import React, {useState, useContext, useEffect} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as uzLatnMessages from "devextreme/localization/messages/uz-Latn.json";

// import {getSystemDictionary} from "../app-localization";
import {FetchData} from "../api/pages-fetch";

const LocalizationContext = React.createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const [langData, setLangData] = useState([]);
  const [customMessagesData, setCustomMessagesData] = useState({});
  const [defaultLang, setDefaultLang] = useState("en");
  const [lang, setLang] = useState(() => getLocale());

  const changedMyLocalFetch = FetchData(
    formatMessage,
    "/w_changeMyLocaleTo",
    "w_changeMyLocaleTo",
    "wisdb"
  ).changeMyLocalToData;

  initMessages();
  // locale(lang);

  useEffect(() => {
    const customMessages = FetchData(
      formatMessage,
      "/CustomMessages",
      "ShortDicsRecordsFlatCustomMessagesObject",
      "hbdb"
    ).custumMessageData;

    const getLangsData = async () => {
      const islangFetch = FetchData(
        formatMessage,
        "/islang",
        "islang",
        "wisdb"
      ).fetchColumnsSchemaData;

      const result = await islangFetch._loadFunc().then((res) => res.data);

      isEnabledLang(result);
      isDefaultLang(result);
      isCurrentLang(result);
    };

    const getCustomMessages = async () => {
      await customMessages
        ._loadFunc()
        .then((res) => setCustomMessagesData({[lang]: res}));
    };

    getCustomMessages();
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
    changedMyLocalFetch._updateFunc(newKey);
  }

  function changeLocale(e) {
    changeMyLocalTo(e.value);
    setLang(e.value);
    setLocale(e.value);

    setTimeout(() => {
      // document.location.reload();
    }, 500);
  }

  function initMessages() {
    loadMessages(ruMessages);
    loadMessages(uzLatnMessages);
    // loadMessages(getSystemDictionary());
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
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export {LocalizationProvider, useLocalization};

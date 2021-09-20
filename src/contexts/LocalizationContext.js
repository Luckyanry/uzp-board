import React, {useState, useContext, useEffect} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as uzLatnMessages from "devextreme/localization/messages/uz-Latn.json";

// import {getSystemDictionary} from "../app-localization";
import {FetchData} from "../api/pages-fetch";
import {urlAnonymous} from "../api/url-config";

const LocalizationContext = React.createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const [langData, setLangData] = useState([]);
  const [customMessagesData, setCustomMessagesData] = useState({});
  const [defaultLang, setDefaultLang] = useState("en");
  const [lang, setLang] = useState(getFromLocalStorege(defaultLang));

  const changedMyLocalFetch = FetchData(
    "/w_changeMyLocaleTo",
    "w_changeMyLocaleTo",
    "wisdb",
    urlAnonymous
  ).changeMyLocalToData;

  initMessages();
  // locale(lang);

  useEffect(() => {
    const customMessages = FetchData(
      "/CustomMessages",
      "ShortDicsRecordsFlatCustomMessagesObject",
      "hbdb",
      urlAnonymous
    ).custumMessageData;

    const getLangsData = async () => {
      const islangFetch = FetchData(
        "/islang",
        "islang",
        "wisdb",
        urlAnonymous
      ).fetchColumnsSchemaData;

      const result = await islangFetch._loadFunc().then((res) => res.data);

      isEnabledLang(result);
      isCurrentLang(result);
      isDefaultLang(result);
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
      const locale = localStorage.getItem("locale");

      if (!locale) return;
      setToLocalStorege(result.short);
    }
  }

  function isDefaultLang(array) {
    if (array.length) {
      const result = array.find(({isdefault}) => isdefault);
      setDefaultLang(result.short);

      const locale = localStorage.getItem("locale");

      if (locale) return;
      changeLocale(result.short);
    }
  }

  function getFromLocalStorege(defaultValue) {
    const locale = localStorage.getItem("locale");
    return locale !== null ? locale : defaultValue;
  }

  function setToLocalStorege(locale) {
    localStorage.setItem("locale", locale);
  }

  function changeMyLocalTo(newKey) {
    changedMyLocalFetch._updateFunc(newKey);
  }

  function changeLocale(value) {
    changeMyLocalTo(value);
    initMessages();
    setLang(value);
    setToLocalStorege(value);

    setTimeout(() => {
      document.location.reload();
    }, 500);
  }

  function changeLocaleHendler(e) {
    changeLocale(e.value);
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
        changeLocaleHendler,
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

import React, {useState, useContext, useEffect, createContext} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";
import * as uzLatnMessages from "devextreme/localization/messages/uz-Latn.json";
import * as uzCyrlMessages from "devextreme/localization/messages/uz-Cyrl.json";

// import {getSystemDictionary} from "../app-localization";
import {FetchData} from "../api/pages-fetch";
import {urlAnonymous} from "../api/url-config";

const LocalizationContext = createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const [langData, setLangData] = useState([]);
  const [defaultLang, setDefaultLang] = useState();
  const [lang, setLang] = useState(getFromLocalStorage(defaultLang));
  const [customMessagesData, setCustomMessagesData] = useState({});

  initMessages();

  useEffect(() => {
    const getCustomMessages = () => {
      const customMessages = FetchData(
        "/CustomMessages",
        "ShortDicsRecordsFlatCustomMessagesObject",
        "hbdb",
        urlAnonymous
      ).loadCustumMessageData();

      customMessages.then((res) =>
        setCustomMessagesData(() => ({[lang]: res}))
      );
    };

    (async () => {
      const loadLangsData = FetchData(
        "/islang",
        "islang",
        "wisdb",
        urlAnonymous
      ).fetchColumnsSchemaData;

      const result = await loadLangsData._loadFunc().then((res) => res.data);

      isEnabledLang(result);
      isDefaultLang(result);
      isCurrentLang(result);

      getCustomMessages();
    })();

    // getLangsData();
    // getCustomMessages();
    locale(lang);

    // return () => {
    //   // setDefaultLang();
    //   setCustomMessagesData({});
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function isEnabledLang(array) {
    if (array.length) {
      const result = array.filter(({isenabled}) => isenabled);
      setLangData(() => result);
    }
  }

  function isCurrentLang(array) {
    if (array.length) {
      const result = array.find(({iscurrent}) => iscurrent);

      const storage = sessionStorage.getItem("language");

      if (!storage) return;

      setLang(() => result.short);
      setToLocalStorege(result.short);
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

  function getFromLocalStorage(defaultValue) {
    const storage = sessionStorage.getItem("language");
    return storage !== null ? storage : defaultValue;
  }

  function setToLocalStorege(language) {
    sessionStorage.setItem("language", language);
  }

  async function changeMyLocalTo(newKey) {
    await FetchData(
      "/w_changeMyLocaleTo",
      "w_changeMyLocaleTo",
      "wisdb",
      urlAnonymous
    ).changeMyLocalToData(newKey);

    window.location.reload();
  }

  function changeLocale(value) {
    changeMyLocalTo(value);
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

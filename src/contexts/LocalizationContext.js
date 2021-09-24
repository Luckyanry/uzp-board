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
  const [customMessagesData, setCustomMessagesData] = useState({});
  const [defaultLang, setDefaultLang] = useState();
  const [lang, setLang] = useState(getFromLocalStorage(defaultLang));

  initMessages();
  // locale(lang);

  useEffect(() => {
    console.log(`useEffect start`);
    const getLangsData = async () => {
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

      await getCustomMessages();
    };

    const getCustomMessages = async () => {
      const customMessages = FetchData(
        "/CustomMessages",
        "ShortDicsRecordsFlatCustomMessagesObject",
        "hbdb",
        urlAnonymous
      ).loadCustumMessageData();

      lang &&
        (await customMessages.then((res) =>
          setCustomMessagesData({[lang]: res})
        ));
    };

    getLangsData();
    // getCustomMessages();

    // initMessages();
    locale(lang);
    console.log(`locale(lang)`, lang);
    console.log(`useEffect end`);
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

      const storage = localStorage.getItem("language");
      if (!storage) return;
      console.log(`isCurrentLang`);

      locale(result.short);
      setLang(result.short);
      // initMessages();
      setToLocalStorege(result.short);
    }
  }

  function isDefaultLang(array) {
    if (array.length) {
      const result = array.find(({isdefault}) => isdefault);
      setDefaultLang(result.short);

      const storage = localStorage.getItem("language");
      if (storage) return;
      console.log("isDefaultLang");

      setLang(result.short);
      locale(result.short);
      // initMessages();
      changeLocale(result.short);
    }
  }

  function getFromLocalStorage(defaultValue) {
    console.log("getFromLocalStorage");
    // initMessages();
    const storage = localStorage.getItem("language");
    return storage !== null ? storage : defaultValue;
  }

  function setToLocalStorege(language) {
    console.log("setToLocalStorege");
    localStorage.setItem("language", language);
  }

  async function changeMyLocalTo(newKey) {
    console.log("changeMyLocalTo");
    await FetchData(
      "/w_changeMyLocaleTo",
      "w_changeMyLocaleTo",
      "wisdb",
      urlAnonymous
    ).changeMyLocalToData(newKey);
  }

  function changeLocale(value) {
    setTimeout(() => {
      window.location.reload();
    }, 500);

    changeMyLocalTo(value);
    setLang(value);
    setToLocalStorege(value);

    // locale(value);

    console.log("changeLocale");
  }

  function changeLocaleHendler(e) {
    console.log("changeLocaleHendler");
    changeLocale(e.value);
  }

  function initMessages() {
    console.log("initMessages");
    loadMessages(ruMessages);
    loadMessages(uzLatnMessages);
    loadMessages(uzCyrlMessages);
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

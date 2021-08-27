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
  const [lang, setLang] = useState(() => getLocale());
  const [defaultLang, setDefaultLang] = useState("ru");
  const [currentLang, setCurrentLang] = useState(true);
  // // const [shortDicsRecordsDataState, setShortDicsRecordsDataState] =
  // //   useState(null);

  const islangFetch = FetchData("/islang", formatMessage).fetchData;
  const changedMyLocalFetch = FetchData(
    "/w_changeMyLocaleTo",
    formatMessage
  ).changeMyLocalToData;

  useEffect(() => {
    islangFetch
      ._loadFunc()
      .then((res) => res.data)
      .then((arr) => {
        setLangData(arr);
        isCurrentLang(arr);
        isDefaultLang(arr);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!langData) return;
  initMessages();
  locale(lang);

  if (langData) {
    console.log(`langData`, langData);
    // console.log(`lang`, lang);
    console.log(`currentLang`, currentLang);
    console.log(`defaultLang`, defaultLang);

    // isCurrentLang(langData);
    // isDefaultLang(langData);
  }

  function isCurrentLang(value) {
    if (value.length) {
      const result = value.find((item) => item.iscurrent);
      setCurrentLang(result.iscurrent);
    }
  }

  function isDefaultLang(value) {
    if (value.length) {
      const result = value.find((item) => item.isdefault);
      setDefaultLang(result.short);
      setLocale(result.short);
    }
  }

  function getLocale() {
    const locale = sessionStorage.getItem("locale");
    return locale != null ? locale : "en";
  }

  function setLocale(locale) {
    sessionStorage.setItem("locale", locale);
  }

  function changeMyLocalTo(newKey) {
    changedMyLocalFetch._insertFunc(newKey);
  }

  function changeLocale(e) {
    setLang(e.value);
    setLocale(e.value);
    changeMyLocalTo(e.value);
    // document.location.reload();
  }

  return (
    <LocalizationContext.Provider
      value={{
        lang,
        locales: langData,
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

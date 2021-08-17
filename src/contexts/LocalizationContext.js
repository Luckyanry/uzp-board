import React, {useState, useContext} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";

import {getLocales, getDictionary} from "../app-localization";

const LocalizationContext = React.createContext();
const useLocalization = () => useContext(LocalizationContext);

const LocalizationProvider = ({children}) => {
  const lastLang = getLocale();
  const [lang, setLang] = useState(() => lastLang);

  initMessages();
  locale(lang);

  function changeLocale(e) {
    setLang(e.value);
    setLocale(e.value);
    document.location.reload();
  }

  return (
    <LocalizationContext.Provider
      value={{
        lang,
        locales: getLocales(),
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

function getLocale() {
  const locale = sessionStorage.getItem("locale");
  return locale != null ? locale : "ru";
}

function setLocale(locale) {
  sessionStorage.setItem("locale", locale);
}

function initMessages() {
  loadMessages(ruMessages);
  loadMessages(getDictionary());
}

export {LocalizationProvider, useLocalization};

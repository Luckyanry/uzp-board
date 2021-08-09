import React, {Component, useState, useContext} from "react";

import {locale, loadMessages, formatMessage} from "devextreme/localization";
import * as ruMessages from "devextreme/localization/messages/ru.json";

import {getLocales, getDictionary} from "../app-localization";

const LocalizationContext = React.createContext();
const useLocalization = () => useContext(LocalizationContext);

// class LocalizationProvider extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       locale: this.getLocale(),
//     };

//     this.locales = getLocales();

//     this.initMessages();
//     locale(this.state.locale);

//     this.changeLocale = this.changeLocale.bind(this);
//   }

//   getLocale() {
//     const locale = sessionStorage.getItem("locale");
//     return locale != null ? locale : "en";
//   }

//   setLocale(locale) {
//     sessionStorage.setItem("locale", locale);
//   }

//   initMessages() {
//     loadMessages(ruMessages);
//     loadMessages(getDictionary());
//   }

//   changeLocale(e) {
//     this.setState({
//       locale: e.value,
//     });
//     this.setLocale(e.value);

//     window.location.reload();
//   }

//   render() {
//     const {children} = this.props;
//     console.log("LocalizationContext state", this.state.locale);

//     return (
//       <LocalizationContext.Provider
//         value={{
//           lang: this.state.locale,
//           locales: this.locales,
//           changeLocale: this.changeLocale,
//           locale,
//           loadMessages,
//           formatMessage,
//         }}
//       >
//         {children}
//       </LocalizationContext.Provider>
//     );
//   }
// }

const LocalizationProvider = ({children}) => {
  const defaultLang = getLocale();
  const [lang, setLang] = useState(defaultLang);

  initMessages();
  locale(lang);

  function changeLocale(e) {
    setLang(e.value);
    setLocale(e.value);

    // window.location.reload();
  }

  console.log(`LocalizationProvider lang`, lang);

  return (
    <LocalizationContext.Provider
      value={{
        lang,
        locales: getLocales(),
        changeLocale: changeLocale,
        locale,
        loadMessages,
        formatMessage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

function initMessages() {
  loadMessages(ruMessages);
  loadMessages(getDictionary());
}

function getLocale() {
  const locale = sessionStorage.getItem("locale");
  return locale != null ? locale : "en";
}

function setLocale(locale) {
  sessionStorage.setItem("locale", locale);
}

export {LocalizationProvider, useLocalization};

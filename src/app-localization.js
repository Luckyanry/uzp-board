const locales = [
  {
    Name: "English",
    Value: "en",
  },
  {
    Name: "Русский",
    Value: "ru",
  },
];

const dictionary = {
  en: {
    Number: "Number",
    Contact: "Contact",
    Company: "Company",
    Language: "Language",
  },
  ru: {
    Number: "Номер",
    Contact: "Имя",
    Company: "Организация",
    Language: "Язык",
  },
};

function getLocales() {
  return locales;
}

function getDictionary() {
  return dictionary;
}

// export default {
//   getLocales() {
//     return locales;
//   },
//   getDictionary() {
//     return dictionary;
//   },
// };

export {getLocales, getDictionary};

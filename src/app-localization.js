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
    project_title: "UZP",
    language: "Language",
    home: "Home",
    home_page_desc: "Home page description...",
    directory: "Directory",
    profile: "Profile",

    countries: "Countries",
    short_name: "Country name",
    numeric: "Numeric",
    alpha2code: "Alpha 2 code",
    alpha3code: "Alpha 3 code",
    short_name_eng: "English country name",
    short_name_karlat: "Karakalpak latin country name",
    short_name_rus: "Russian country name",
    short_name_uzcyr: "Uzbek cyrillic country name",
    short_name_uzlat: "Uzbek latin country name",

    about: "About",
    about_page_desc: "About us information...",
    logout: "Logout",
  },
  ru: {
    project_title: "ЕАИС",
    language: "Язык",
    home: "Главная",
    home_page_desc: "Описание главной страницы...",
    directory: "Справочник",
    profile: "Профиль",

    countries: "Страны",
    short_name: "Название страны",
    numeric: "Нумерация",
    alpha2code: "Альфа-код 2",
    alpha3code: "Альфа-код 3",
    short_name_eng: "Английское название",
    short_name_karlat: "Каракалпакское название - латынь",
    short_name_rus: "Русское название",
    short_name_uzcyr: "Узбекское название - кириллица",
    short_name_uzlat: "Узбекское название - латынь",

    about: "Информация",
    about_page_desc: "Информация о нас...",
    logout: "Выход",
  },
};

function getLocales() {
  return locales;
}

function getDictionary() {
  return dictionary;
}

export {getLocales, getDictionary};

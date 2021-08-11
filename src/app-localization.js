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
    numeric_err_message:
      "The 'Numeric' field must contain a maximum of 4 digits!",
    alpha2code: "Alpha 2 code",
    alpha2code_err_message:
      "The 'Alpha 2code' field must contain 2 characters in uppercase!",
    alpha3code: "Alpha 3 code",
    alpha3code_err_message:
      "The 'Alpha 3code' field must contain 3 characters in uppercase!",
    short_name_eng: "English country name",
    short_name_karlat: "Karakalpak latin country name",
    short_name_rus: "Russian country name",
    short_name_uzcyr: "Uzbek cyrillic country name",
    short_name_uzlat: "Uzbek latin country name",

    soato: "SOATO",
    territory_name_rus: "Territory name",
    code: "Region code",
    expand: "Expand all rows",

    about: "About",
    about_page_desc: "About us information...",
    logout: "Logout",

    FirstName: "FirstName",
    LastName: "LastName",
    Prefix: "Prefix",
    Position: "Position",
    BirthDate: "BirthDate",
    HireDate: "HireDate",
    Notes: "Notes",
    Address: "Address",
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
    numeric_err_message: "Поле 'Нумерация' должно содержать максимум 4 цифры!",
    alpha2code: "Альфа-код 2",
    alpha2code_err_message:
      "Поле 'Альфа-код 2' должно содержать 2 буквы в верхнем регистре!",
    alpha3code: "Альфа-код 3",
    alpha3code_err_message:
      "Поле 'Альфа-код 3' должно содержать 3 буквы в верхнем регистре!",
    short_name_eng: "Английское название",
    short_name_karlat: "Каракалпакское название - латынь",
    short_name_rus: "Русское название",
    short_name_uzcyr: "Узбекское название - кириллица",
    short_name_uzlat: "Узбекское название - латынь",

    soato: "COATO",
    territory_name_rus: "Административно-территориальное название",
    code: "Код региона",
    expand: "Развернуть все строки",

    about: "Информация",
    about_page_desc: "Информация о нас...",
    logout: "Выход",

    FirstName: "Имя",
    LastName: "Фамилия",
    Prefix: "Обращение",
    Position: "Должность",
    BirthDate: "Дата рождения",
    HireDate: "Дата приема на работу",
    Notes: "Заметки",
    Address: "Адрес",
  },
};

function getLocales() {
  return locales;
}

function getDictionary() {
  return dictionary;
}

export {getLocales, getDictionary};

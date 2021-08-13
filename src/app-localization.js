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
    FirstName: "First Name",
    LastName: "Last Name",
    Prefix: "Prefix",
    Position: "Position",
    BirthDate: "Birth date",
    HireDate: "Hire date",
    Notes: "Notes",
    Address: "Address",
    logout: "Logout",

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
    code: "Region code",
    expand: "Expand all rows",
    as_child_of: "As child of",
    territory_name_rus: "Territory name rus",
    territory_name_eng: "Territory name eng",
    territory_name_uzlat: "Territory name uzbek latin",
    territory_name_uzcyr: "Territory name uzbek cyrillic",
    territory_name_karlat: "Territory name karakalpak latin",
    admin_centre_rus: "Administrative center name russsian",
    admin_centre_eng: "Administrative center name english",
    admin_centre_uzlat: "Administrative center name uzbek latin",
    admin_centre_uzcyr: "Administrative center name uzbek cyrillic",
    admin_centre_karlat: "Administrative center name karakalpak",

    soogu: "SOOGU",
    codeSogu: "Code Sogu",
    codeSogu_numeric_err_message:
      "The 'Code Sogu' field must contain from 4 to 5 digits!",
    codeOKPO: "Code OKPO",
    codeOKPO_numeric_err_message:
      "The 'Code OKPO' field must contain a maximum of 8 digits!",
    name_rus: "Name of the organization",
    name_uzcyr: "Uzbek cyrillic name",
    name_uzlat: "Uzbek latin name",
    name_karlat: "Karakalpak latin name",
    name_eng: "Uzbek latin name",

    about: "About",
    about_page_desc: "About us information...",

    status: "Status",
    Active: "Active",
    Deactivated: "Deactivated",

    new_row: "Add a new row",
  },
  ru: {
    project_title: "ЕАИС",
    language: "Язык",

    home: "Главная",
    home_page_desc: "Описание главной страницы...",
    directory: "Справочник",

    profile: "Профиль",
    FirstName: "Имя",
    LastName: "Фамилия",
    Prefix: "Обращение",
    Position: "Должность",
    BirthDate: "Дата рождения",
    HireDate: "Дата приема на работу",
    Notes: "Заметки",
    Address: "Адрес",
    logout: "Выход",

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

    soato: "СОАТО",
    soato_title:
      "Справочник 'Система обозначений административно-территориальных единиц' (СОАТО)",
    code: "Код региона",
    expand: "Развернуть все строки",
    as_child_of: "Подчиняется",
    territory_name_rus: "Территориальное название",
    territory_name_eng: "Территориальное название eng",
    territory_name_uzlat: "Территориальное name uzbek latin",
    territory_name_uzcyr: "Территориальное name uzbek cyrillic",
    territory_name_karlat: "Территориальное name karakalpak latin",
    admin_centre_rus: "Административный центр russsian",
    admin_centre_eng: "Административный центр english",
    admin_centre_uzlat: "Административный центр uzbek latin",
    admin_centre_uzcyr: "Административный центр uzbek cyrillic",
    admin_centre_karlat: "Административный центр karakalpak",

    soogu: "СООГУ",
    soogu_title:
      "Справочник 'Система обозначений органов государственного и хозяйственного управления' (СООГУ)",
    codeSogu: "Код СООГУ",
    codeSogu_numeric_err_message:
      "Поле 'Код СООГУ' должно содержать от 4 до 5 цифр!",
    codeOKPO: "Код ОКПО",
    codeOKPO_numeric_err_message:
      "Поле 'Код ОКПО' должно содержать максимум 8 цифры!",
    name_rus:
      "Наименование органа государственного и хозяйственного управления (РУ)",
    name_uzcyr: "Узбекское название",
    name_uzlat: "Узбекское название - латынь",
    name_karlat: "Каракалпакское название - латынь",
    name_eng: "Английское название",

    about: "Информация",
    about_page_desc: "Информация о нас...",

    status: "Статус",
    Active: "Активен",
    Deactivated: "Отключен",

    new_row: "Создать новое поле",
  },
};

function getLocales() {
  return locales;
}

function getDictionary() {
  return dictionary;
}

export {getLocales, getDictionary};

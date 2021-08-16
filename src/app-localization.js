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

    directory: "Individ. and legal entities",
    // directory: "Individuals and legal entities",

    countries: "Countries",
    short_name: "Country name",
    numeric: "Numeric",
    numeric_err_message:
      "The 'Numeric' field must contain a maximum of 4 digits!",
    alpha2code: "Alpha2",
    alpha2code_err_message:
      "The 'Alpha2' field must contain 2 characters in uppercase!",
    alpha3code: "Alpha3",
    alpha3code_err_message:
      "The 'Alpha3' field must contain 3 characters in uppercase!",
    short_name_rus: "Name (RU)",
    short_name_uzcyr: "Name (ЎЗ)",
    short_name_uzlat: "Name (O’Z)",
    short_name_karlat: "Name (UZ-Q)",
    short_name_eng: "Name (EN)",

    soato: "SOATO",
    soato_title: "(SOATO)",
    soato_code: "Code SOATO",
    expand: "Expand all rows",
    as_child_of: "As child of",
    territory_name_rus: "Territory name (RU)",
    territory_name_uzcyr: "Territory name (ЎЗ)",
    territory_name_uzlat: "Territory name (O’Z)",
    territory_name_karlat: "Territory name (UZ-Q)",
    territory_name_eng: "Territory name (EN)",
    admin_centre_rus: "Administrative center name (RU)",
    admin_centre_uzcyr: "Administrative center name (ЎЗ)",
    admin_centre_uzlat: "Administrative center name (O’Z)",
    admin_centre_karlat: "Administrative center name (UZ-Q)",
    admin_centre_eng: "Administrative center name (EN)",

    soogu: "SOOGU",
    soogu_title: "(SOOGU)",
    name_rus: "Name (RU)",
    name_uzcyr: "Name (ЎЗ)",
    name_uzlat: "Name (O’Z)",
    name_karlat: "Name (UZ-Q)",
    name_eng: "Name (EN)",
    code_sogu: "Code SOOGU",
    codeSogu_numeric_err_message:
      "The 'Code Sogu' field must contain from 4 to 5 digits!",
    codeOKPO: "Code OKPO",
    codeOKPO_numeric_err_message:
      "The 'Code OKPO' field must contain a maximum of 8 digits!",

    kspd: "KSPD",
    kspd_title: "KSPD",
    kspd_code: "Code KSPD",
    code_err_message: "The 'Code' field must contain 3 digits!",

    opf_title: "Org. and legal forms",
    // opf_title: "Organizational and legal forms",

    kfs: "KFS",
    kfs_title: "KFS",
    kfs_code: "Code KFS",

    kopf: "KOPF",
    kopf_title: "KOPF",
    kopf_code: "Code KOPF",
    // designation_rus: "Designation",
    // designation_uzcyr: "Наименование (узбекское название)",
    // designation_uzlat: "Наименование (узбекское название - латынь)",
    // designation_karlat: "Наименование (каракалпакское название - латынь)",
    // designation_eng: "Наименование (английское название)",

    about: "About",
    about_page_desc: "About us information...",

    status: "Status",
    Active: "Active",
    Deactivated: "Deactivated",

    new_row: "Add a new row",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
  },
  ru: {
    project_title: "ЕАИС",
    language: "Язык",

    home: "Главная",
    home_page_desc: "Описание главной страницы...",

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

    directory: "Физ. и юр. лица",

    countries: "Страны",
    short_name: "Название страны",
    numeric: "Нумерация",
    numeric_err_message: "Поле 'Нумерация' должно содержать максимум 4 цифры!",
    alpha2code: "Alpha2",
    alpha2code_err_message:
      "Поле 'Alpha2' должно содержать 2 буквы в верхнем регистре!",
    alpha3code: "Alpha3",
    alpha3code_err_message:
      "Поле 'Alpha3' должно содержать 3 буквы в верхнем регистре!",
    short_name_rus: "Наименование (РУ)",
    short_name_uzcyr: "Наименование (ЎЗ)",
    short_name_uzlat: "Наименование (O’Z)",
    short_name_karlat: "Наименование (UZ-Q)",
    short_name_eng: "Наименование (EN)",

    soato: "СОАТО",
    soato_title:
      "Справочник 'Система обозначений административно-территориальных единиц' (СОАТО)",
    soato_code: "Код СОАТО",
    expand: "Развернуть все строки",
    as_child_of: "Подчиняется",
    territory_name_rus: "Территориальное название (РУ)",
    territory_name_uzcyr: "Территориальное название (ЎЗ)",
    territory_name_uzlat: "Территориальное название (O’Z)",
    territory_name_karlat: "Территориальное название (UZ-Q)",
    territory_name_eng: "Территориальное название (EN)",
    admin_centre_rus: "Административный центр (РУ)",
    admin_centre_uzcyr: "Административный центр (ЎЗ)",
    admin_centre_uzlat: "Административный центр (O’Z)",
    admin_centre_karlat: "Административный центр (UZ-Q)",
    admin_centre_eng: "Административный центр (EN)",

    soogu: "СООГУ",
    soogu_title:
      "Справочник 'Система обозначений органов государственного и хозяйственного управления' (СООГУ)",
    name_rus: "Наименование (РУ)",
    name_uzcyr: "Наименование (ЎЗ)",
    name_uzlat: "Наименование (O’Z)",
    name_karlat: "Наименование (UZ-Q)",
    name_eng: "Наименование (EN)",
    code_sogu: "Код СООГУ",
    codeSogu_numeric_err_message:
      "Поле 'Код СООГУ' должно содержать от 4 до 5 цифр!",
    codeOKPO: "Код ОКПО",
    codeOKPO_numeric_err_message:
      "Поле 'Код ОКПО' должно содержать максимум 8 цифры!",
    // name_rus:
    //   "Наименование органа государственного и хозяйственного управления",
    // name_uzcyr:
    //   "Наименование органа государственного и хозяйственного управления (узбекское название)",
    // name_uzlat:
    //   "Наименование органа государственного и хозяйственного управления (узбекское название - латынь)",
    // name_karlat:
    //   "Наименование органа государственного и хозяйственного управления (каракалпакское название - латынь)",
    // name_eng:
    //   "Наименование органа государственного и хозяйственного управления (английское название)",

    kspd: "КСДП",
    kspd_title: "Классификатор состояния деятельности предприятия (КСДП)",
    kspd_code: "Код КСДП",
    code_err_message: "Поле 'Код' должно содержать 3 цифры!",

    opf_title: "Орг.-правовые формы",

    kfs: "КФС",
    kfs_title: "Справочник Форм собственности",
    kfs_code: "Код КФС",

    kopf: "КОПФ",
    kopf_title: "Справочник 'Организационно-правовые формы'",
    kopf_code: "Код КОПФ",
    // designation_rus: "Наименование",
    // designation_uzcyr: "Наименование (узбекское название)",
    // designation_uzlat: "Наименование (узбекское название - латынь)",
    // designation_karlat: "Наименование (каракалпакское название - латынь)",
    // designation_eng: "Наименование (английское название)",

    about: "Информация",
    about_page_desc: "Информация о нас...",

    status: "Статус",
    Active: "Активен",
    Deactivated: "Отключен",

    new_row: "Создать новое поле",
    add: "Добавить",
    edit: "Редактироватть",
    delete: "Удалить",
  },
};

function getLocales() {
  return locales;
}

function getDictionary() {
  return dictionary;
}

export {getLocales, getDictionary};

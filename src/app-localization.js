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
    countries_title: "'{0}' directory",
    short_name: "Country name",
    short_name_rus: "Name (RU)",
    short_name_uzcyr: "Name (ЎЗ)",
    short_name_uzlat: "Name (O’Z)",
    short_name_karlat: "Name (UZ-Q)",
    short_name_eng: "Name (EN)",
    alpha2code: "Alpha2",
    alpha2code_err_message:
      "The 'Alpha2' field must contain 2 characters in uppercase!",
    alpha3code: "Alpha3",
    alpha3code_err_message:
      "The 'Alpha3' field must contain 3 characters in uppercase!",
    numeric: "Numeric",
    numeric_err_message:
      "The 'Numeric' field must contain a maximum of 4 digits!",

    soato: "SOATO",
    soato_title:
      "Directory 'System of designation of administrative-territorial units' ({0})",
    expand: "Expand all rows",
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
    as_child_of: "As child of",
    soato_code: "Code {0}",

    soogu: "SOOGU",
    soogu_title:
      "System of designations of state and economic management ({0})",
    name_rus: "Name (RU)",
    name_uzcyr: "Name (ЎЗ)",
    name_uzlat: "Name (O’Z)",
    name_karlat: "Name (UZ-Q)",
    name_eng: "Name (EN)",
    code_soogu: "Code SOOGU",
    codeSogu_numeric_err_message:
      "The 'Code SOOGU' field must contain from 4 to 5 digits!",
    sogogu_okpo_title: "OKPO",
    codeOKPO: "Code OKPO",
    codeOKPO_numeric_err_message:
      "The 'Code OKPO' field must contain a maximum of 8 digits!",

    kspd: "KSPD",
    kspd_title: "{0}",
    kspd_code: "Code {0}",

    opf_title: "Org. and legal forms",
    // opf_title: "Organizational and legal forms",

    kfs: "KFS",
    kfs_title: "Directory 'Forms of ownership' ({0})",
    kfs_code: "Code {0}",

    kopf: "KOPF",
    kopf_title: "Directory 'Organizational and Legal Forms' ({0})",
    kopf_code: "Code {0}",

    shortDics: "Short directories",

    status: "Status",
    Active: "Active",
    Deactivated: "Deactivated",

    colomn_chooser: "Column selection",
    colomn_chooser_empty_text: "Drag a column header here to hide it",

    create_new_item: "Create new {0} item",
    add_new_item: "Add new {0} item",
    edit_new_item: "Edit {0} item",
    delete_new_item: "Delete {0} item",

    code_err_numeric_message: "The 'Code {0}' field must contain only digits!",
    code_err_message: "The 'Code {0}' field must contain 3 digits!",
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
    countries_title: "Справочник '{0}'",
    short_name: "Название страны",
    short_name_rus: "Наименование (РУ)",
    short_name_uzcyr: "Наименование (ЎЗ)",
    short_name_uzlat: "Наименование (O’Z)",
    short_name_karlat: "Наименование (UZ-Q)",
    short_name_eng: "Наименование (EN)",
    alpha2code: "Alpha2",
    alpha2code_err_message:
      "Поле 'Alpha2' должно содержать 2 буквы в верхнем регистре!",
    alpha3code: "Alpha3",
    alpha3code_err_message:
      "Поле 'Alpha3' должно содержать 3 буквы в верхнем регистре!",
    numeric: "Нумерация",
    numeric_err_message: "Поле 'Нумерация' должно содержать максимум 4 цифры!",

    soato: "СОАТО",
    soato_title:
      "Справочник 'Система обозначений административно-территориальных единиц' ({0})",
    expand: "Развернуть все строки",
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
    as_child_of: "Подчиняется",
    soato_code: "Код {0}",

    soogu: "СООГУ",
    soogu_title:
      "Справочник 'Система обозначений органов государственного и хозяйственного управления' ({0})",
    name_rus: "Наименование (РУ)",
    name_uzcyr: "Наименование (ЎЗ)",
    name_uzlat: "Наименование (O’Z)",
    name_karlat: "Наименование (UZ-Q)",
    name_eng: "Наименование (EN)",
    code_soogu: "Код СООГУ",
    codeSogu_numeric_err_message:
      "Поле 'Код СООГУ' должно содержать от 4 до 5 цифр!",
    codeOKPO: "Код ОКПО",
    codeOKPO_numeric_err_message:
      "Поле 'Код ОКПО' должно содержать максимум 8 цифры!",

    kspd: "КСДП",
    kspd_title: "Классификатор состояния деятельности предприятия ({0})",
    kspd_code: "Код {0}",

    opf_title: "Орг.-правовые формы",

    kfs: "КФС",
    kfs_title: "Справочник 'Формы собственности' ({0})",
    kfs_code: "Код {0}",

    kopf: "КОПФ",
    kopf_title: "Справочник 'Организационно-правовые формы' ({0})",
    kopf_code: "Код {0}",

    shortDics: "Короткие справочники",

    status: "Статус",
    Active: "Активен",
    Deactivated: "Отключен",

    colomn_chooser: "Выбор столбцов",
    colomn_chooser_empty_text:
      "Перетащите сюда заголовок столбца, чтобы скрыть его",

    create_new_item: "Создать новую запись {0}",
    add_new_item: "Добавить новую запись {0}",
    edit_new_item: "Изменить запись {0}",
    delete_new_item: "Удалить запись {0}",

    code_err_numeric_message: "Поле 'Код {0}' должно содержать только цифры!",
    code_err_message: "Поле 'Код {0}' должно содержать 3 цифры!",
  },
};

function getLocales() {
  return locales;
}

function getDictionary() {
  return dictionary;
}

export {getLocales, getDictionary};

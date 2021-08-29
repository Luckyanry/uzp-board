// const locales = [
//   {
//     Name: "r",
//     Value: "en",
//   },
//   {
//     Name: "Русский",
//     Value: "ru",
//   },
//   {
//     Name: "O'zbek lotin",
//     Value: "uz-Latn",
//   },
// ];

const dictionary = {
  en: {
    project_title: "UZP",
    language: "Language",
    id: "ID",

    home: "Home",
    home_page_desc: "Home page description...",

    users: "Users",
    users_dir_title: "Subsystem 'Users'",
    usersList: "List of 'Users'",
    usersRole: "List of 'Roles'",
    usersGroup: "List of 'Groups'",
    UserName: "User name",
    Locale: "Short language code",
    Locked: "Locked",
    Disabled: "Disabled",
    TimeZone: "Time zone",
    created: "User registration date",
    pwdlastchange: "Last password change",
    UserType: "User Type",

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

    show_password: "Show password",
    generate_password: "Create a strong password",
    enter_password: "Enter password",
    confirm_password: "Confirm password",
    required_password: "Password is required",
    confirm_required_password: "Confirm Password is required",
    password_not_match: "Password and Confirm Password do not match",
    submit: "Submit",
    submit_notify: "You have successfully submitted the form!",

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
    kspd_title: "Classification of the state of the enterprise {0}",
    kspd_code: "Code {0}",

    opf_title: "Org. and legal forms",
    // opf_title: "Organizational and legal forms",

    kfs: "KFS",
    kfs_title: "Directory 'Forms of ownership' ({0})",
    kfs_code: "Code {0}",

    kopf: "KOPF",
    kopf_title: "Directory 'Organizational and Legal Forms' ({0})",
    kopf_code: "Code {0}",

    oked: "OKED",
    oked_title: "Classification of Types of Economic Activity ({0})",
    oked_code: "Code {0}",
    oked_ОКОНХ: "ОКОНХ",

    shortDics: "Short directories",
    name: "Meta name",
    class: "Class",
    className: "Type",
    metaid: "Meta ID",

    status: "Status",
    Active: "Active",
    Deactivated: "Deactivated",

    expand: "Expand all rows",
    minimised: "Minimize all rows",

    colomn_chooser: "Column selection",
    colomn_chooser_empty_text: "Drag a column header here to hide it",

    create_new_item: "Create new {0} item",
    add_new_item: "Add new {0} item",
    edit_new_item: "Edit {0} item",
    delete_new_item: "Delete {0} item",

    pattern_rule_err_msg_1:
      "Password must contain at least one English lowercase characters (a through z), for example, 'abcd'!",
    pattern_rule_err_msg_2:
      "Password must contain at least one English lowercase characters (a through z) and one English uppercase characters (A through Z), for example, 'AbcD'!",
    pattern_rule_err_msg_3:
      "Password must contain at least one English lowercase characters (a through z), one English uppercase characters (A through Z) and one digit, for example, 'Ab7c'!",
    pattern_rule_err_msg_4:
      "Password must contain at least one English lowercase characters (a through z), one English uppercase characters (A through Z), one digit and one non-alphabetic characters, for example, 'n$R7'!",
    string_length_rule_err_msg:
      "Password must have at least {0} and must be less than {1} symbols",

    code_err_numeric_message: "The 'Code {0}' field must contain only digits!",
    code_err_message_3: "The 'Code {0}' field must contain 3 digits!",
    code_err_message_2:
      "The 'Code {0}' field must contain a maximum of 2 digits!",
    code_err_message_5:
      "The 'Code {0}' field must contain a maximum of 5 digits!",
  },
  ru: {
    project_title: "ЕАИС",
    language: "Язык",
    id: "ID",

    home: "Главная",
    home_page_desc: "Описание главной страницы...",

    users: "Пользователи",
    users_dir_title: "Подсистема 'Пользователи'",
    usersList: "Список пользователей",
    usersRole: "Список 'Ролей'",
    usersGroup: "Список 'Групп'",
    UserName: "Имя пользователя",
    Locale: "Короткий языковый код",
    Locked: "Заблокирован",
    Disabled: "Отключен",
    TimeZone: "Часовой пояс",
    created: "Дата регистрации пользователя",
    pwdlastchange: "Последнее изменение пароля",
    UserType: "Тип пользователя",

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

    show_password: "Показать пароль",
    generate_password: "Создайте надежный пароль",
    enter_password: "Введите пароль",
    confirm_password: "Подтвердите пароль",
    required_password: "Поле ввода пароля является обязательным",
    confirm_required_password:
      "Поле подтверждения пароля является обязательным",
    password_not_match: "Поля Пароль и Подтверждение пароля не совпадают!",
    submit: "Отправить",
    submit_notify: "Вы успешно отправили форму!",

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
      "Поле 'Код ОКПО' должно содержать максимум 8 цифр!",

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

    oked: "ОКЭД",
    oked_title: "Классификатор видов экономической деятельности ({0})",
    oked_code: "Код {0}",
    oked_ОКОНХ: "ОКОНХ",

    shortDics: "Короткие справочники",
    name: "Мета название",
    class: "Класс",
    className: "Тип",
    metaid: "Мета ID",

    status: "Статус",
    Active: "Активен",
    Deactivated: "Отключен",

    expand: "Развернуть все строки",
    minimised: "Свернуть все строки",

    colomn_chooser: "Выбор столбцов",
    colomn_chooser_empty_text:
      "Перетащите сюда заголовок столбца, чтобы скрыть его",

    create_new_item: "Создать новую запись {0}",
    add_new_item: "Добавить новую запись {0}",
    edit_new_item: "Изменить запись {0}",
    delete_new_item: "Удалить запись {0}",

    pattern_rule_err_msg_1:
      "Пароль должен содержать как минимум один строчный английский символ (от a до z), например, 'abcd'!",
    pattern_rule_err_msg_2:
      "Пароль должен содержать как минимум один строчный английский символ (от a до z) и один английский прописной символ (от A до Z), например, 'AbcD'!",
    pattern_rule_err_msg_3:
      "Пароль должен содержать как минимум один строчный английский символ (от a до z), один английский прописной символ (от A до Z) и одну цифру, например, 'Ab7c'!",
    pattern_rule_err_msg_4:
      "Пароль должен содержать как минимум один строчный английский символ (от a до z), один английский прописной символ (от A до Z), одну цифру и один неалфавитный символ, например, 'n$R7'.",
    string_length_rule_err_msg:
      "Пароль должен содержать не менее {0} и не более {1} символов.",

    code_err_numeric_message: "Поле 'Код {0}' должно содержать только цифры!",
    code_err_message_3: "Поле 'Код {0}' должно содержать 3 цифры!",
    code_err_message_2: "Поле 'Код {0}' должно содержать максимум 2 цифры!",
    code_err_message_5: "Поле 'Код {0}' должно содержать максимум 5 цифр!",
  },
  "uz-Latn": {
    project_title: "UZP",
    language: "Til",
    id: "ID",

    home: "Uy",
    home_page_desc: "Bosh sahifa tavsifi...",

    users: "Foydalanuvchilar",
    users_dir_title: "'Foydalanuvchilar' quyi tizimi",
    usersList: "'Foydalanuvchilar' ro'yxati",
    usersRole: "'Rolar' ro'yxati",
    usersGroup: "'Guruhlar' ro'yxati",
    UserName: "Foydalanuvchi nomi",
    Locale: "Qisqa til kodi",
    Locked: "Qulflangan",
    Disabled: "O'chirilgan",
    TimeZone: "Vaqt zonasi",
    created: "Foydalanuvchilarni ro'yxatdan o'tkazish sanasi",
    pwdlastchange: "So'nggi parolni o'zgartirish",
    UserType: "Foydalanuvchi turi",

    profile: "Profil",
    FirstName: "Ism",
    LastName: "Familiya",
    Prefix: "Prefiks",
    Position: "Lavozim",
    BirthDate: "Tug'ilgan sana",
    HireDate: "Ishga qabul qilish sanasi",
    Notes: "Eslatmalar",
    Address: "Manzil",
    logout: "Chiqish",

    show_password: "Parolni ko'rsatish",
    generate_password: "Kuchli parol yarating",
    enter_password: "Parolni kiriting",
    confirm_password: "Parolni tasdiqlang",
    required_password: "Parol talab qilinadi",
    confirm_required_password: "Parolni tasdiqlash talab qilinadi",
    password_not_match: "Parol va Parolni tasdiqlash mos kelmaydi",
    submit: "Yuborish",
    submit_notify: "Siz shaklni muvaffaqiyatli topshirdingiz!",

    directory: "Jismoniy va yuridik shaxslar",

    countries: "Mamlakatlar",
    countries_title: "'{0}' katalogi",
    short_name: "Mamlakat nomi",
    short_name_rus: "(RU) tilida mamlakat nomi",
    short_name_uzcyr: "(ЎЗ) tilida mamlakat nomi",
    short_name_uzlat: "(O’Z) tilida mamlakat nomi",
    short_name_karlat: "(UZ-Q) tilida mamlakat nomi",
    short_name_eng: "(EN) tilida mamlakat nomi",
    alpha2code: "Alpha2",
    alpha2code_err_message:
      "'Alpha2' maydonida 2 ta katta harf bo'lishi kerak!",
    alpha3code: "Alpha3",
    alpha3code_err_message:
      "'Alpha3' maydonida 3 ta katta harf bo'lishi kerak!",
    numeric: "Raqamli",
    numeric_err_message:
      "'Raqamli' maydonida maksimal 4 ta raqam bo'lishi kerak!",

    soato: "MBBT - SOATO",
    soato_title:
      "Katalog 'Ma'muriy-hududiy birliklarni belgilash tizimi' ({0})",

    territory_name_rus: "Hudud nomi (RU)",
    territory_name_uzcyr: "Hudud nomi (ЎЗ)",
    territory_name_uzlat: "Hudud nomi (O’Z)",
    territory_name_karlat: "Hudud nomi (UZ-Q)",
    territory_name_eng: "Hudud nomi (EN)",
    admin_centre_rus: "Ma'muriy markaz nomi (RU)",
    admin_centre_uzcyr: "Ma'muriy markaz nomi (ЎЗ)",
    admin_centre_uzlat: "Ma'muriy markaz nomi (O’Z)",
    admin_centre_karlat: "Ma'muriy markaz nomi (UZ-Q)",
    admin_centre_eng: "Ma'muriy markaz nomi (EN)",
    as_child_of: "Qo'llaniladi",
    soato_code: "Kod {0}",

    soogu: "DXBBT - SOOGU",
    soogu_title: "Davlat va xo'jalik boshqaruvi belgilari tizimi ({0})",
    name_rus: "(RU) tilida mamlakat nomi",
    name_uzcyr: "(ЎЗ) tilida mamlakat nomi",
    name_uzlat: "(O’Z) tilida mamlakat nomi",
    name_karlat: "(UZ-Q) tilida mamlakat nomi",
    name_eng: "(EN) tilida mamlakat nomi",
    code_soogu: "Kod SOOGU",
    codeSogu_numeric_err_message:
      "'Kod SOOGU' maydonida 4 dan 5 gacha raqam bo'lishi kerak!",
    sogogu_okpo_title: "OKPO",
    codeOKPO: "Kod OKPO",
    codeOKPO_numeric_err_message:
      "'Kod OKPO' maydonida maksimal 8 ta raqam bo'lishi kerak!",

    kspd: "KHT - KSPD",
    kspd_title: "Korxona holatining tasnifi {0}",
    kspd_code: "Kod {0}",

    opf_title: "Tashkiliy va huquqiy shakllar",

    kfs: "MS - KFS",
    kfs_title: "'Mulkchilik shakllari' katalogi ({0})",
    kfs_code: "Kod {0}",

    kopf: "THS - KOPF",
    kopf_title: "'Tashkiliy va huquqiy shakllar' katalogi ({0})",
    kopf_code: "Kod {0}",

    oked: "IFTT - OKED",
    oked_title: "Iqtisodiy faoliyat turlarining tasnifi ({0})",
    oked_code: "Kod {0}",
    oked_ОКОНХ: "ОКОНХ",

    shortDics: "Qisqa kataloglar",
    name: "Meta nomi",
    class: "Sinf",
    className: "Turi",
    metaid: "Meta ID",

    status: "Holat",
    Active: "Faol",
    Deactivated: "O'chirilgan",

    expand: "Barcha qatorlarni kengaytirish",
    minimised: "Barcha qatorlarni kamaytiring",

    colomn_chooser: "Ustun tanlash",
    colomn_chooser_empty_text:
      "Yashirish uchun ustun sarlavhasini bu erga torting",

    create_new_item: "Yangi {0} element yaratish",
    add_new_item: "Yangi {0} ta element qo‘shish",
    edit_new_item: "{0} ta elementni tahrirlash",
    delete_new_item: "{0} ta elementni o‘chirish",

    pattern_rule_err_msg_1:
      "Parol kamida bitta inglizcha kichik harflardan (a dan zgacha), masalan, 'abcd'!",
    pattern_rule_err_msg_2:
      "Parol kamida bitta inglizcha kichik harflardan (a dan zgacha) va bitta inglizcha katta harflardan (A dan Z gacha), masalan, 'AbcD'!",
    pattern_rule_err_msg_3:
      "Parol kamida bitta inglizcha kichik harflardan (a dan zgacha), bitta inglizcha katta harflardan (A dan Z gacha) va itta raqamdan, masalan, 'Ab7c'!",
    pattern_rule_err_msg_4:
      "Parol kamida bitta inglizcha kichik harflardan (a dan zgacha), bitta inglizcha katta harflardan (A dan Z gacha), bitta raqamdan va bitta alifbo bo'lmagan belgilardan iborat bo'lishi kerak, masalan, 'n$R7'",
    string_length_rule_err_msg:
      "Parol kamida {0} bo'lishi va {1} belgidan kam bo'lmasligi kerak",

    code_err_numeric_message:
      "'Kod {0}' maydonida faqat raqamlar bo'lishi kerak!",
    code_err_message_3: "'Kod {0}' maydonida 3 ta raqam bo'lishi kerak!",
    code_err_message_2:
      "'Kod {0}' maydonida maksimal 2 ta raqam bo'lishi kerak!",
    code_err_message_5:
      "'Kod {0}' maydonida maksimal 5 ta raqam bo'lishi kerak!",
  },
  "uz-Cyrl": {
    project_title: "UZP",
    language: "Тили",
  },
  "kaa-Latn": {
    project_title: "UZP",
    language: "Tili",
  },
};

// function getLocales() {
//   return locales;
// }

function getDictionary() {
  return dictionary;
}

export {
  // getLocales,
  getDictionary,
};

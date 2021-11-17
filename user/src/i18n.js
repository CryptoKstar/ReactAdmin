import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                "Dashboard": "Dashboard",
                "Welcome!": "Welcome!",
                "You have no company for now. So please create New Company!": "You have no company for now. So please create New Company!",
                "Confirm": "Confirm",
                "COMPANY": "COMPANY",
                "SITES": "SITES",
                "PAYMENT METHODS": "PAYMENT METHODS",
                "TRANSACTIONS": "TRANSACTIONS",
                "SUBSCRIPTIONS": "SUBSCRIPTIONS",
                "PLATFORM MODULES": "PLATFORM MODULES",
                "TICKETS": "TICKETS",
                "HELP": "HELP",
                "DASHBOARD": "DASHBOARD",
                "Please Select Company": "Please Select Company",
                "ID": "ID",
                "Site Url": "Site Url",
                "Site Urls": "Site Urls",
                "Company Name": "Company Name",
                "Date": "Date",
                "Company": "Company",
                "No selected": "No selected",
                "Site": "Site",
                "Select Company": "Select Company",
                "Select Site": "Select Site",
                "Please Select Site": "Please Select Site",
                "Please create New Company": "Please create New Company",
                "ResNo": "ResNo",
                "TaxNo": "TaxNo",
                "Address": "Address",
                "Conutry": "Conutry",
                "Company Details": "Company Details",
                "Details": "Details",
                "Go Company": "Go Company",
                "Update": "Update",
                "Delete": "Delete",
                "New Company": "New Company",
                "Too Short!": "Too Short!",
                "Too Long!": "Too Long!",
                "Name is required": "Name is required",
                "Reg Number required": "Reg Number require",
                "Tax Number required": "Tax Number required",
                "Country required": "Country required",
                "Create": "Create",
                "Reset": "Reset",
                "Address is required": "Address is required",
                "Not found": "Not found",
                "Selected site is deleted correctly!": "Selected site is deleted correctly!",
                "New Site is added in the company": "New Site is added in the company",
                "Please create new Site.": "Please create new Site.",
                "Sites": "Sites",
                "New Site": "New Site",
                "Please add sites in the Company": "Please add sites in the Company",
                "Save": "Save",
                "Cancel": "Cancel",
                "Site Details": "Site Details",
                "Go Sites": "Go Sites",
                "Site Secret": "Site Secret",
                "Site Key": "Site Key",
                "ReGenerate": "ReGenerate",
                "Action": "Action",
                "Payment Method Name": "Payment Method Name",
                "Payment Methods": "Payment Methods",
                "Add PaymentMethod": "Add PaymentMethod",
                "The Payment Methods is exist in this site": "The Payment Methods is exist in this site",
                "Selected Payment Methods is added correctly": "Selected Payment Methods is added correctly",
                "New Payment Methods": "New Payment Methods",
                "Payments": "Payments",
                "Payment Method": "Payment Method",
                "Type": "Type",
                "Status": "Status",
                "Please Select Site. so you see it!": "Please Select Site. so you see it!",
                "Transactions": "Transactions",
                "Go Transactions": "Go Transactions",
                "Transactions Details": "Transactions Details",
                "Name": "Name",
                "Amount": "Amount",
                "UID": "UID",
                "Subscriptions": "Subscriptions",
                "Subscriptions Details": "Subscriptions Details",
                "Go Subscriptions": "Go Subscriptions",
                "Payment Methods Details": "Payment Methods Details",
                "GO PaymentMethod": "GO PaymentMethod",
                "Platform Modules": "Platform Modules",
                "Ticket": "Ticket",
                "New Ticket": "New Ticket",
                "My Tickets": "My Tickets",
                "Help": "Help",
                "Link": "Link",
                "Description": "Description",
                "Home": "Home",
                "Logout": "Logout",
                "Don’t have an account?": "Don’t have an account?",
                "Get started": "Get started",
                "Hi, Welcome Back" : "Hi, Welcome Back",
                "Email must be a valid email address": "Email must be a valid email address",
                "Email is required": "Email is required",
                "Password is required": "Password is required",
                "Email address": "Email address",
                "Password": "Password",
                "Remember me": "Remember me",
                "Forgot password?": "Forgot password?",
                "Login": "Login",
                "Sign In FaceBook" : "Sign In FaceBoo",
                "Sign In Google" : "Sign In Google", 
                "Users closed Google Register Window Or Network Error!" : "Users closed Google Register Window Or Network Error!",
                "Already have an account?" : "Already have an account?",
                "Manage the job more effectively with Minimal" : "Manage the job more effectively with Minimal",
                "OR" : "OR",
                "First name required" : "First name required",
                "Last name required" : "Last name required",
                "ConfrimPassword is required" : "ConfrimPassword is required",
                "First name" : "First name",
                "Last name" : "Last name",
                "Register" : "Register",
                "Logo Upload": "Logo Upload",
                "Localizations" : "Localizations",
                "PAYMENT METHOD LOCALIZATIONS" : "PAYMENT METHOD LOCALIZATIONS",
                "Add Payment Method Localizations" : "Add Payment Method Localizations",
                "Search data..." : "Search data...",
                "Localization" : "Localization",
                "New Localization" : "New Localization",
                "Go Localizations" : "Go Localizations",
                "Localization Details" : "Localization Details",
            }
        },
        sb: {
            translations: {
                "Dashboard": "Командна табла",
                "Welcome!": "Добродошли!",
                "You have no company for now. So please create New Company!": "Немате друштво за сада. Зато вас молимо да направите нову компанију!",
                "Confirm": "Потврди",
                "COMPANY": "КОМПАНИЈА",
                "SITES": "САЈТОВИ",
                "PAYMENT METHODS": "НАЧИНИ ПЛАЋАЊА",
                "TRANSACTIONS": "ТРАНСАКЦИЈЕ",
                "SUBSCRIPTIONS": "ПРЕТПЛАТЕ",
                "PLATFORM MODULES": "ПЛАТФОРМСКИ МОДУЛИ",
                "TICKETS": "УЛАЗНИЦЕ",
                "HELP": "помоћ",
                "DASHBOARD": "КОМАНДНА ТАБЛА",
                "Please Select Company": "Молимо изаберите компанију",
                "ID": "ИД",
                "Site Url": "Урл сајта",
                "Site Urls": "УРЛ-ови сајта",
                "Company Name": "назив фирме",
                "Date": "података",
                "Company": "Компанија",
                "No selected": "Није изабрано",
                "Site": "веб сајт",
                "Select Company": "Изаберите компанију",
                "Please Select Site": "Молимо изаберите Сајт",
                "Select Site": "Изаберите Сајт",
                "Please create New Company": "Направите нову компанију",
                "ResNo": "РесНо",
                "TaxNo": "ТакНо",
                "Address": "Адреса",
                "Conutry": "Држава",
                "Company Details": "Више информација",
                "Details": "Детаљи",
                "Go Company": "Го Цомпани",
                "Update": "ажурирање",
                "Delete": "Избриши",
                "New Company": "Нова компанија",
                "Too Short!": "Прекратак!",
                "Too Long!": "Сувише дуго!",
                "Name is required": "Име је обавезно",
                "Reg Number required": "Потребан је регистарски број",
                "Tax Number required": "Порески број је обавезан",
                "Country required": "Потребна је земља",
                "Create": "створио",
                "Reset": "Ресетовање",
                "Address is required": "Адреса је обавезна",
                "Not found": "Није пронађен",
                "Selected site is deleted correctly!": "Изабрани сајт је исправно избрисан!",
                "New Site is added in the company": "У компанији је додат нови сајт",
                "Please create new Site.": "Молимо креирајте нови сајт.",
                "Sites": "Сајтови",
                "New Site": "Нев Сите",
                "Please add sites in the Company": "Молимо додајте сајтове у компанији",
                "Save": "сачувати",
                "Cancel": "Поништити",
                "Site Details": "Детаљи локације",
                "Go Sites": "Иди на сајтове",
                "Site Secret": "Тајна сајта",
                "Site Key": "Кључ сајта",
                "ReGenerate": "РеГенерате",
                "Action": "поступак",
                "Payment Method Name": "Назив начина плаћања",
                "Payment Methods": "Начини плаћања",
                "Add PaymentMethod": "Додајте начин плаћања",
                "The Payment Methods is exist in this site": "Начини плаћања постоје на овом сајту",
                "Selected Payment Methods is added correctly": "Изабрани начини плаћања су исправно додати",
                "New Payment Methods": "Нови начини плаћања",
                "Payments": "Плаћања",
                "Payment Method": "Начин плаћања",
                "Type": "Тип",
                "Status": "Статус",
                "Please Select Site. so you see it!": "Молимо изаберите Сајт. па видиш!",
                "Transactions": "Трансакције",
                "Transactions Details": "Детаљи трансакције",
                "Go Transactions": "Иди Трансакције",
                "Name": "Име",
                "Amount": "Износ",
                "UID": "УИД",
                "Subscriptions": "Претплате",
                "Subscriptions Details": "Детаљи о претплатама",
                "Go Subscriptions": "Иди Претплате",
                "Payment Methods Details": "Детаљи о начинима плаћања",
                "GO PaymentMethod": "ГО ПаиментМетход",
                "Platform Modules": "Платформ Модулеса",
                "Ticket": "Улазница",
                "New Ticket": "Нова карта",
                "My Tickets": "Моје карте",
                "Help": "Помоћ",
                "Link": "Линк",
                "Description": "Опис",
                "Home": "Кућа",
                "Logout": "Одјавити се",
                "Don’t have an account?": "Немате налог?",
                "Get started": "Почети",
                "Hi, Welcome Back"  : "Здраво, добродошао назад",
                "Email must be a valid email address": "Адреса е-поште мора бити важећа адреса е-поште",
                "Email is required": "Емаил је обавезан",
                "Password is required": "Потребна је шифра",
                "Email address": "Адреса Е-поште",
                "Password": "Лозинка",
                "Remember me": "Сети ме се",
                "Forgot password?": "Заборавили сте лозинку?",
                "Login": "Пријавите се",
                "Sign In FaceBook" : "Пријавите се на Фацебоок",
                "Sign In Google" : "Пријавите се на Гоогле", 
                "Users closed Google Register Window Or Network Error!" : "Корисници су затворили прозор Гоогле регистрације или грешка мреже!",
                "Already have an account?" : "Већ имате налог?",
                "Manage the job more effectively with Minimal" : "Управљајте послом ефикасније уз Минимал",
                "OR" : "ИЛИ",
                "First name required" : "Име је обавезно",
                "Last name required" : "Презиме је обавезно",
                "ConfrimPassword is required" : "ЦонфримПассворд је обавезан",
                "First name" : "Име",
                "Last name" : "Презиме",
                "Register" : "Регистровати",
                "Logo Upload" : "Лого Уплоад",
                "Localizations" : "Локализације",
                "PAYMENT METHOD LOCALIZATIONS" : "ЛОКАЛИЗАЦИЈЕ НАЧИНА ПЛАЋАЊА",
                "Add Payment Method Localizations" : "Додајте локализације начина плаћања",
                "Search data..." : "Претражи податке...",
                "Localization" : "Локализација",
                "New Localization" : "Нова локализација",
                "Go Localizations" : "Иди Локализације",
                "Localization Details" : "Детаљи о локализацији",
            }
        },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;

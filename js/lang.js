const defaultLanguage = localStorage.getItem("language") || "en";

i18next
  .use(i18nextXHRBackend)
  .init({
    lng: defaultLanguage,
    fallbackLng: "en",
    debug: true,
    backend: {
      loadPath: "js/translate/{{lng}}.json",
    },
    sanitize: false,
  })
  .catch((err) => {
    console.error("Error initializing i18next:", err);
  });

function changeLanguage(lang) {
  i18next
    .changeLanguage(lang)
    .then(() => {
      localStorage.setItem("language", lang);
      location.reload();
    })
    .catch((err) => {
      console.error("Error changing language:", err);
    });
}

function updateContent() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.innerHTML = i18next.exists(key) ? i18next.t(key) : key;
  });

  var languageText =
    i18next.language === "en"
      ? "English"
      : i18next.language === "pt"
      ? "Português"
      : i18next.language === "es"
      ? "Español"
      : "한국어";
  $("#selectedLanguage").text(languageText);
}

i18next.on("languageChanged", updateContent);

updateContent();

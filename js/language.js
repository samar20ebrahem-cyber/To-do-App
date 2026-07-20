i18next
    .use(i18nextHttpBackend)
    .init({
        lng: localStorage.getItem("language") || "en",
        backend: {
            loadPath: "locales/{{lng}}.json"
        }
    }, () => {
        updateContent();
    });
function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        element.textContent = i18next.t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        element.placeholder = i18next.t(element.dataset.i18nPlaceholder);
    });
}
// تغيير اللغة
function changeLanguage(lang) {
    localStorage.setItem("language", lang);
    i18next.changeLanguage(lang, () => {
        updateContent();
    });
}
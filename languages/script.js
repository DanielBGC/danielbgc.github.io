const toggleLanguageSwitch = document.querySelector('#toggle-language');
toggleLanguageSwitch.addEventListener('click', toggleLanguage);

const downloadResumeLink = document.querySelector('#download-resume-link');

function toggleLanguage() {
  let lang = toggleLanguageSwitch.checked ? 'en' : 'pt';
  const elements = document.querySelectorAll("[data-i18n]");

  fetch(`/languages/${lang}.json`)
    .then((res) => res.json())
    .then((translation) => {
      elements.forEach((element) => {
        let keys = element.dataset.i18n.split(".");
        let text = keys.reduce((obj, i) => obj[i], translation);
        if (text) {
          element.innerHTML = text;
        }
      });
      downloadResumeLink.setAttribute('href', translation['resume-path'])
    })
    .catch(() => {
      console.error(`Could not load the ${lang}.json.`)
    })
}
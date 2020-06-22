function storeSearch(clickCountry) {
  document.cookie = `lastSearch = ${clickCountry}; expires=Sun, 1 Jan 2040 12:00:00 UTC`;
}

function search() {
  const search = event.target.value;
  if (!search) return;
  const inputfield = document.getElementById("form");
  inputfield.value = search;
  storeSearch(search);
  form.submit();
}

function changeCSS() {
  const oldlink = document.getElementsByTagName("link").item(0);

  const [cssFile, newMoon] = cssFileValidation(oldlink);

  const newlink = document.createElement("link");

  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("href", cssFile);

  storeCssPrefs(cssFile);

  document.getElementById("moon").classList = newMoon;
  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

function cssFileValidation(currentFile) {
  if (currentFile.href == "http://localhost:7000/css/dark/index.css") {
    return ["http://localhost:7000/css/light/index.css", "far fa-moon"];
  } else {
    return ["http://localhost:7000/css/dark/index.css", "fas fa-moon"];
  }
}

function storeCssPrefs(change) {
  if (change == "http://localhost:7000/css/dark/index.css") {
    localStorage.setItem("style", "dark");
  } else {
    localStorage.setItem("style", "light");
  }
}

function checkCssPrefs() {
  const checkbox = document.getElementById("dark-light");
  const prefs = localStorage.getItem("style");
  if (prefs == "dark") {
    checkbox.checked = true;
    return true;
  }
  return false;
}

window.onload = checkCssPrefs() ? changeCSS() : null;


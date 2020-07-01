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
  const oldlink = findLink()
  const [cssFile, newMoon] = cssFileValidation(oldlink.href);


  const newlink = document.createElement("link");
  newlink.setAttribute("rel", "stylesheet");
  newlink.setAttribute("type", "text/css");
  newlink.setAttribute("id", "main-style")
  newlink.setAttribute("href", cssFile);

  storeCssPrefs(cssFile);

  document.getElementById("moon").classList = newMoon;
  document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

function cssFileValidation(currentFile) {
  const removedPrefix = removePrefix(currentFile.toString().split("/"))
  if (removedPrefix == "./css/dark/index.css") {
    return ["./css/light/index.css", "far fa-moon"];
  } else {
    return ["./css/dark/index.css", "fas fa-moon"];
  }
}

function storeCssPrefs(change) {
  if (change == "./css/dark/index.css") {
    localStorage.setItem("style", "dark");
  } else {
    localStorage.setItem("style", "light");
  }
}

function findLink() {
  const links = Array.from(document.getElementsByTagName("link"));
  const linkIndex = links.findIndex(i => i.id)
  return links[linkIndex]
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

function removePrefix(fullUrl) {
  return `./${fullUrl[3]}/${fullUrl[4]}/${fullUrl[5]}`
}

window.onload = checkCssPrefs() ? changeCSS() : null;


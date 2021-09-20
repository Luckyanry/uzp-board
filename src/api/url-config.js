const urlAnonymous = "https://uzapi.is.in.ua";
const urlADauth = "https://uz.is.in.ua";
const urlBaseParam = "/actions.asp?";

const getAuthURL = (url) => {
  sessionStorage.setItem("sessionURL", url);
};

export {urlAnonymous, urlADauth, urlBaseParam, getAuthURL};

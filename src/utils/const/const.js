export const patternEmail = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.{1,1}[a-z]{2,}";
export const nameCookie = "jwt";
export const getSearchedFilms =
  JSON.parse(localStorage.getItem("searchedFilms")) || [];

export function setSearchedFilms(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

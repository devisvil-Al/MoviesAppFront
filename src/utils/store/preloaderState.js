const PreloaderStateFilm = () => {
    const filmState = {
        films: JSON.parse(localStorage.getItem("films")) || [],
        searchFilms: [],
        searchStr : JSON.parse(localStorage.getItem("search")) || [],
    }

    return filmState
}
const user = JSON.parse(localStorage.getItem("userInfo"));
const PreloaderStateUser = () => {
    const userState = {
        name: user ? user.name : "",
        email: user ? user.email : "",
        loggetIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
        savedFilms: JSON.parse(localStorage.getItem("savedFilms")) || [],
    }
    return userState
}

export { PreloaderStateFilm, PreloaderStateUser }
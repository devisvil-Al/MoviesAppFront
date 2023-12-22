# aston-project

- Movies - приложение для поиска и просмотра фильмов.
- Использованное API: [Beatfilm-movies](https://api.nomoreparties.co/beatfilm-movies").

---

## Основной функционал

- Регистрация и авторизация пользователей;
- Страница с информацией о пользователе;
- Сохраненные фильмы: пользователь может добавлять или удалять из списка сохраненных;
- Поиск по названию фильма, выпадающее меню из фильмов;
- История поиска: сохранение названия фильма, возможность перейти на страницу поиска после нажатия на название фильма.

---

## Реализация требований

### 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы Требования к функциональности.

#### React

- [x] Пишем функциональные компоненты c хуками: [components](src/components).
- [x] Есть разделение на [умные](src/components/MoviesCardList/MoviesCardList.js) и [глупые](src/components/Promo/Promo.js) компоненты.
- [x] Есть рендеринг [списков](src/components/MoviesCardList/MoviesCardList.js).
- [x] Реализована хотя бы одна [форма](src/components/Register/Register.js).
- [x] Есть применение Контекст API: [ColorContext](src/components/context/ColorContext.jsx) используется в [Header](src/components/Header/Header.js),[Profile](src/components/Profile/Profile.js).
- [x] Есть применение предохранителя: [ErrorBoundary](src/components/Movies/Movies.js).
- [x] Есть хотя бы один кастомный хук: [useForm](src/components/hooks/useForm.jsx).
- [x] Хотя бы несколько компонентов используют PropTypes: [MoviesCardList](src/components/MoviesCardList/MoviesCardList.js), [ProtectedRoute](src/components/ProtectedRoute/ProtectedRoute.jsx).
- [x] Поиск не должен триггерить много запросов к серверу ([debounce](src/components/SearchForm/SearchForm.jsx)).
- [x] Есть применение [lazy + Suspense](src/components/App/App.js).

#### Redux

- [x] Используем Modern Redux with Redux Toolkit: [store](src/utils/store/store.js).
- [x] Используем слайсы: [userSlise](src/utils/store/slices/userslice.js).
- [x] Есть хотя бы одна кастомная мидлвара: [loginLoggerMiddleware](src/utils/store/middleware/loginLoggerMiddleware.js).
- [x] Используется RTK Query: [movies](src/utils/store/query/movies.js), [user](src/utils/store/query/user.js).
- [x] Используется Transforming Responses: [user](src/utils/store/query/user.js).


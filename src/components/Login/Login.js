import "./Login.css";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useAuthorizeMutation } from "../../utils/store/query/user";
import useForm from "../hooks/useForm";
import logo from "../../images/logo.svg";
import { patternEmail, nameCookie } from "../../utils/const/const";
import { setLoggetIn } from "../../utils/store/slices/userslice";
import { setCookie } from "../../utils/store/cookie/cookie";

function Login() {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [authorize, { isError, error }] = useAuthorizeMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, errors, handleChange, clearError } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    const err = errors.email === "" && errors.password === "";
    setButtonStatus(err);
  }, [errors]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
      authorize({
        email: form.email,
        password: form.password,
      }).then(({ data }) => {
        if (!data.error) {
          clearError();
          dispatch(setLoggetIn());
          setCookie(nameCookie, data.token, { expires: 7 });
          navigate("/movies");
        }
      }).catch((err) => {
        console.error(err);
      })
  };

  return (
    <main>
      <section className="auth">
        <Link to="/">
          <img className="auth__logo" src={logo} alt="логотип" />
        </Link>
        <h1 className="auth__title">Рады видеть!</h1>
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="auth__form-wrapper">
            <label className="auth__form-label">E-mail</label>
            <input
              className="auth__form-input"
              type="email"
              minLength="5"
              maxLength="30"
              pattern={patternEmail}
              required
              name="email"
              placeholder="Введите ваш e-mail"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <span className="auth__form-error">{errors.email}</span>
          <div className="auth__form-wrapper">
            <label className="auth__form-label">Пароль</label>
            <input
              className="auth__form-input"
              type="password"
              minLength="8"
              maxLength="30"
              required
              name="password"
              placeholder="Введите ваш пароль"
              autoComplete="on"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <span className="auth__form-error">{errors.password}</span>
          <span className="auth__form-error auth__form-error_log">
            {isError ? error.data.message : ""}
          </span>
          <button
            className={
              buttonStatus
                ? "auth__button auth__button_margin"
                : "auth__button auth__button_margin auth__button_disabled"
            }
            type="submit"
            disabled={!buttonStatus}
          >
            Войти
          </button>
        </form>
        <div className="auth__question-wrapper">
          <p className="auth__question">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="auth__question auth__question_link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;

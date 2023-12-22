import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { useRegistryMutation } from "../../utils/store/query/user";
import useForm from "../hooks/useForm";
import logo from "../../images/logo.svg";
import { patternEmail } from "../../utils/const/const";

function Register() {
  const [registry, { error, isError }] = useRegistryMutation();
  const [buttonStatus, setButtonStatus] = useState(false);
  const { form, errors, handleChange, clearError } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    const err =
      errors.name === "" && errors.email === "" && errors.password === "";
    setButtonStatus(err);
  }, [errors]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registry({
        name: form.name,
        email: form.email,
        password: form.password,
      }).then(({error}) => {
        if (!error) {
          navigate("/signin");
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
        <h1 className="auth__title">Добро пожаловать!</h1>
        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="auth__form-wrapper">
            <label className="auth__form-label">Имя</label>
            <input
              className="auth__form-input"
              type="text"
              id="name-input"
              name="name"
              placeholder="Введите ваше имя"
              minLength="2"
              maxLength="30"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <span className="auth__form-error">{errors.name}</span>
          <div className="auth__form-wrapper">
            <label className="auth__form-label">E-mail</label>
            <input
              className="auth__form-input"
              type="email"
              id="email-input"
              name="email"
              minLength="5"
              maxLength="30"
              pattern={patternEmail}
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Введите ваш e-mail"
            />
          </div>
          <span className="auth__form-error">{errors.email}</span>
          <div className="auth__form-wrapper">
            <label className="auth__form-label">Пароль</label>
            <input
              className="auth__form-input"
              type="password"
              id="auth-input"
              name="password"
              minLength="8"
              maxLength="30"
              value={form.password}
              onChange={handleChange}
              autoComplete="on"
              required
              placeholder="Введите ваш пароль"
            />
          </div>
          <span className="auth__form-error">{errors.password}</span>
          <span className="auth__form-error auth__form-error_reg">
            {isError ? error.data.message : ""}
          </span>
          <button
            className={
              buttonStatus
                ? "auth__button"
                : "auth__button auth__button_disabled"
            }
            type="submit"
            disabled={!buttonStatus}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="auth__question-wrapper">
          <p className="auth__question"> Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__question auth__question_link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Register;

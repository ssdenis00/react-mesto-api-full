import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const handleChangeInputEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const handleChangeInputPass = (e) => {
    setPassValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email: emailValue,
      pass: passValue,
    });
  };

  return (
    <main className="main">
      <section className="authorization page__content">
        <h1 className="authorization__title">Регистрация</h1>
        <form
          action="/"
          className="authorization__form"
          onSubmit={handleSubmit}
        >
          <div className="authorization__inputs">
            <input
              type="email"
              value={emailValue}
              onChange={handleChangeInputEmail}
              className="authorization__input"
              placeholder="Email"
            />
            <input
              type="password"
              value={passValue}
              onChange={handleChangeInputPass}
              className="authorization__input"
              placeholder="Пароль"
            />
          </div>
          <button type="submit" className="authorization__btn">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="authorization__link">
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </main>
  );
}

export default Register;

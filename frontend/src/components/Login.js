import { useState } from "react";

function Login({ onLogin }) {
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
    onLogin({
      email: emailValue,
      pass: passValue,
    });
  };

  return (
    <main className="main">
      <section className="authorization authorization_type_login page__content">
        <h1 className="authorization__title">Вход</h1>
        <form
          action="/"
          className="authorization__form"
          onSubmit={handleSubmit}
        >
          <div className="authorization__inputs">
            <input
              type="email"
              value={emailValue}
              className="authorization__input"
              placeholder="Email"
              onChange={handleChangeInputEmail}
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
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;

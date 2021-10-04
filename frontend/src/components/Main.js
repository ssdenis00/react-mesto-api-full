import React from "react";
import plus from "../images/plus.svg";
import Card from "./Card";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile page__content">
          <div className="profile__block">
            <div className="profile__avatar-container">
              <img
                src={currentUser.avatar}
                alt="Аватар"
                className="profile__avatar"
              />
              <button
                type="button"
                className="profile__avatar-overlay"
                aria-label="открыть окно замены аватара"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__info">
              <div className="profile__text">
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__description">{currentUser.about}</p>
              </div>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="открыть окно редактирования профиля"
                onClick={props.onEditProfile}
              ></button>
            </div>
          </div>
          <button
            className="profile__add-btn"
            type="button"
            aria-label="добавить запись"
            onClick={props.onAddPlace}
          >
            <img
              src={plus}
              alt="Плюс, добавить запись"
              className="profile__add-btn-img"
            />
          </button>
        </section>
        <section className="galary page__content">
          <ul className="galary__grid">
            {props.cards.map((card) => (
              <Card
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}
                onCardClick={props.onImg}
                card={card}
                key={card._id}
              />
            )).reverse()}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;

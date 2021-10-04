import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `galary__delete-item ${isOwn ? "galary__delete-item_visible" : "galary__delete-item_hidden"
    }`;

  const isLiked = props.card.likes.some((id) => id === currentUser._id);

  const cardLikeButtonClassName = `galary__like ${isLiked ? "galary__like_active" : ""
    }`;

  function handleClickCard() {
    props.onCardClick(props.card);
  }

  function handleCardLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="galary__item">
      <button
        onClick={handleCardDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="удалить запись"
      ></button>
      <button
        type="button"
        ariallabel="открыть картинку"
        className="galary__link-img"
        onClick={handleClickCard}
      >
        <img
          src={props.card.link}
          alt={props.card.name}
          className="galary__img"
        />
      </button>
      <div className="galary__description">
        <h2 className="galary__title">{props.card.name}</h2>
        <div className="galary__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLikeClick}
            aria-label="поставить лайк"
          ></button>
          <p className="galary__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

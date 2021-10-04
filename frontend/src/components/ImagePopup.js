import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_img ${
        props.card.state ? "popup_visible-on" : ""
      }`}
    >
      <div className="popup__container popup__container_type_img">
        <button
          className="popup__cross popup__cross_type_img"
          type="button"
          aria-label="закрыть всплывающее окно"
          onClick={props.onClose}
        ></button>
        <figure className="popup__block-img">
          <img
            src={props.card.data.link}
            alt={`фото: ${props.card.data.name}`}
            className="popup__img"
          />
          <figcaption className="popup__description">
            {props.card.data.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;

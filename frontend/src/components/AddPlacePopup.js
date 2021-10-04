import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  React.useEffect(() => {
    setCardLink("");
    setCardName("");
  }, [isOpen]);

  function handleChangeName(e) {
    setCardName(e.target.value);
  }

  function handleChangeLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place-name"
        className="popup__form-text popup__form-text_input_title"
        name="name"
        placeholder="Название"
        value={cardName || ""}
        onChange={handleChangeName}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__form-error" id="place-name-error"></span>
      <input
        type="url"
        id="place-link"
        value={cardLink || ""}
        className="popup__form-text popup__form-text_input_img"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        required
      />
      <span className="popup__form-error" id="place-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

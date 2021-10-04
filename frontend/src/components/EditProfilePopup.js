import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <input
        type="text"
        id="edit-title"
        className="popup__form-text popup__form-text_input_name"
        name="name"
        placeholder="Имя"
        value={name || ""}
        onChange={handleChangeName}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__form-error" id="edit-title-error"></span>
      <input
        type="text"
        id="edit-description"
        className="popup__form-text popup__form-text_input_job"
        name="about"
        placeholder="Вид деятельности"
        value={description || ""}
        onChange={handleChangeDescription}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__form-error" id="edit-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

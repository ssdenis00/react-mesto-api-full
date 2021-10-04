import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
    >
      <input
        type="url"
        id="avatar-link"
        ref={avatarRef}
        className="popup__form-text popup__form-text_input_avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__form-error" id="avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props){
  const avatarRef = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    props.onUpdateAvatar(avatarRef.current.value,e, setIsLoading);
  }

  return (
  <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} id="edit-avatar" specialDelete={false} question={false} title="Обновить аватар" name="editAvatar" buttonText={isLoading?"Сохранение...":"Сохранить"} >
    <input ref={avatarRef} id="edit-url-avatar" required name="link" className="form__field" placeholder="Ссылка на картинку" type="url" />
    <span className="popup__error edit-url-avatar-error"></span>
  </PopupWithForm>)
}

export default EditAvatarPopup;
import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../context/CurrentUserContext';

function EditProfilePopup(props){

  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const nameRef = React.useRef();
  const deskRef = React.useRef();

  function handleChangeName(e) {
    setName(nameRef.current.value);
  }
  function handleChangeDescription(e) {
    setDescription(deskRef.current.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    setIsLoading(true)
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    },e,setIsLoading);
  } 

  return (
  <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} id="edit-profile" specialDelete={false} question={false} title="Редактировать профиль" name="editProfile" buttonText={isLoading?"Сохранение...":"Сохранить"}>
    <input ref={nameRef} value={name || ""} onChange={handleChangeName} id="edit-name" minLength="2" maxLength="40" required placeholder="Имя" name="name" className="form__field" type="text" />
    <span className="popup__error edit-name-error"></span>
    <input ref={deskRef} value={description || ""} onChange={handleChangeDescription} id="edit-job" minLength="2" maxLength="200" required placeholder="Работа" name="about" className="form__field" type="text" />
    <span className="popup__error edit-job-error"></span>
  </PopupWithForm>)
}

export default EditProfilePopup;
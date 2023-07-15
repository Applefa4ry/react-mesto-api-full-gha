import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  function handleChangeName(e) {
    setName(nameRef.current.value);
  }
  function handleChangeLink(e) {
    setLink(linkRef.current.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    setIsLoading(true)
    
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddNewCard({
      name: name,
      link: link,
    },e,setIsLoading)
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);
  
  return (
    <PopupWithForm 
      onSubmit={handleSubmit} 
      onClose={props.onClose} 
      isOpen={props.isOpen} 
      id="edit-place" 
      specialDelete={false} 
      question={false} 
      title="Новое место" 
      name="addCard" 
      buttonText={isLoading?"Создание...":"Создать"}>
          <input ref={nameRef} onChange={handleChangeName} id="edit-title" minLength="2" maxLength="30" required name="name" className="form__field" placeholder="Название" type="text" />
          <span className="popup__error edit-title-error"></span>
          <input ref={linkRef} onChange={handleChangeLink} id="edit-url" required name="link" className="form__field" placeholder="Ссылка на картинку" type="url" />
          <span className="popup__error edit-url-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
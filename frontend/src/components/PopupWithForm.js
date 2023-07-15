function PopupWithForm(props){
  return(
    <div id={props.id} className={`popup ${props.isOpen?"popup_opened":""}`}>
      <div className={`popup__container ${props.specialDelete?"deletePicture":""}`}>
        <h2 className={`${props.question?"popup__question":"popup__title"}`}>{props.title}</h2>
        <form onSubmit={props.onSubmit} name={props.id} className={`form ${props.name}`} noValidate>
          {props.children}
          <button type="submit" className="form__button-submit">{props.buttonText}</button>
        </form>
      </div>
      <button onClick={props.onClose} type="button" className="popup__close"></button>
    </div>
  )
}

export default PopupWithForm;
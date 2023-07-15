function ImagePopup(props){
  return(
    <div id="edit-picture" className={`popup ${props.isOpen?"popup_opened":""}`}>
      <figure className="picture">
        <button onClick={props.onClose} type="button" className="popup__close picture__close"></button>
        <img id="picture-img" className="picture__image" src={props.card.link} alt={props.card.name} />
        <figcaption id="picture-title" className="picture__title">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;
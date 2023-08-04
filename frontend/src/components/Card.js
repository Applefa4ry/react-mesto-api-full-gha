function Card(props){
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike(){
    props.onCardLike(props.card, props.setCards)
  }

  function handleCardDelete(){
    props.onCardDelete(props.card, props.setCards)
  }

    // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === props.currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i === props.currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `card__like ${isLiked && 'card__like_active'}` 
  );;


  return(
    <figure className="card">
      <img onClick={handleClick} className="card__image" src={props.card.link} alt={props.card.name}/>
      <figcaption className="card__about">
        <h2 className="card__title">{props.card.name}</h2>
        <button onClick={handleCardLike} type="button" className={cardLikeButtonClassName}></button>
        <span className="card__like-counter">{props.card.likes.length}</span>
      </figcaption>
      {isOwn && <button type="button" className='card__trash' onClick={handleCardDelete} />}
    </figure>
  )
}

export default Card
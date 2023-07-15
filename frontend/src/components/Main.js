import React from 'react'
import Card from './Card'
import {CurrentUserContext} from '../context/CurrentUserContext';

function Main(props){
  const currentUser = React.useContext(CurrentUserContext)

  return(
    <main className="content">
        <section className="profile">
          <div className="profile__overlay">
            <img className="profile__avatar" src={currentUser.avatar} alt="Жак-Ив Кусто" />
            <button onClick={props.onEditAvatar} type="button" className="profile__edit-avatar"></button>
          </div>
          <div className="profile__info">
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
          </div>

          <button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
        </section>
        <section className="cards">
        {props.cards.map((elem, i) => {
          return(
            <Card onCardDelete={props.handleCardDelete} onCardLike={props.handleCardLike} onCardClick={props.handleCardClick} card={elem} key={elem._id} currentUser={currentUser} setCards={props.setCards} />
          )
        })}
        </section>
      </main>
  )
}

export default Main
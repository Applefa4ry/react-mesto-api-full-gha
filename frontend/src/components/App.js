
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip ';
import * as auth from "../utils/auth"

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isRegister, setIsRegister] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res){
          setLoggedIn(true);
          setEmail(res.email);
          navigate("/", {replace: true})
        }
      });
    }
  }

  const handleRegister = (e) => {
    setIsRegister(e)
  }
  
  const handleLogin = () => {
    handleTokenCheck();
    setLoggedIn(true);
  }

  const handleLogOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
  }

  const openTooltip = () => {
    setInfoTooltipOpen(true)
  }

  React.useEffect(() => {
    api.getUserInfoFromServer()
    .then(res => {
      setCurrentUser(res)
    })
    .catch(err => console.log(`Ошибка ${err}`))
  }, [loggedIn])

  function handleCardClick(data){
    setSelectedCard(data)
    setImagePopupOpen(true)
  }
  
  function closeAllPopups(){
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setSelectedCard({})
    setInfoTooltipOpen(false)
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true)
  }

  const [cards, setCards] = React.useState([])
  React.useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(err => console.log(`Ошибка ${err}`))
  }, [loggedIn])

  function handleCardLike(card, setCards){
    const isLiked = card.likes.some(i => i === currentUser._id);

    (!isLiked? api.addLike(card._id) : api.deleteLike(card._id))
    .then(newCard => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c))
    })
    .catch(err => console.log(`Ошибка ${err}`))
  }

  function handleCardDelete(card, setCards){
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => console.log(`Ошибка ${err}`))
  }

  function handleUpdateUser(data,e, setIsLoading){
    api.setUserInfoOnServer(data)
      .then(data => {
        setCurrentUser(data);
        e.target.reset();
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(data,e, setIsLoading){
    api.setUserAvatarOnServer(data)
      .then(data => {
        setCurrentUser(data);
        e.target.reset();
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleAddNewCard(newCard,e, setIsLoading){
    api.addNewCard(newCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        e.target.reset();
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка ${err}`))
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      
        <PopupWithForm id="delete-picture" specialDelete={true} question={true} title="Вы уверены?" name="deletePictureForm" buttonText="Да" />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddNewCard={handleAddNewCard} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <InfoTooltip isRegister={isRegister} onClose={closeAllPopups} isOpen={isInfoTooltipOpen} />
        
        <Header loggedIn={loggedIn} email={email} onLogOut={handleLogOut} />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement cards={cards} setCards={setCards} handleCardDelete={handleCardDelete} handleCardLike={handleCardLike} handleCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} element={Main} loggedIn={loggedIn}/>} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} setEmail={setEmail} openError={setInfoTooltipOpen} />} />
          <Route path="/sign-up" element={<Register openTooltip={openTooltip} handleRegister={handleRegister} />} />
        </Routes>
        {false?<Footer />:""}
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

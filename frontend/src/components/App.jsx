import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DelCardPopup from './DelCardPopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/api';
import auth from '../utils/auth';


function App() {
  //попап редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //попап добавления новых карточек
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //попап аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //попап увеличения карточки
  const [selectedCard, setSelectedCard] = useState(null);
  //попап удаления карточки
  const [deletedCard, deletePopup] = useState(null);
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = useState(false);
  //попап успешного/неуспешного входа
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // current user
  const [currentUser, setCurrentUser] = useState({});
  //карточки
  const [cards, setCards] = useState([]);
  //текст кнопки
  const [isLoading, setIsLoading] = useState(false);
  //статус входа
  const [loggedIn, setLoggedIn] = useState(false);
  //email
  const [email, setEmail] = useState('');

  const navigate = useNavigate();


  //Получаем информацию с сервера
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards.reverse());
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  //проверка токена и авторизация пользователя
  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setToken(token);
      auth.checkToken(token)
        .then((user) => {
          setLoggedIn(true);
          setEmail(user.email);
          navigate('/', { replace: true });
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Регистрация пользователя
  function onRegister(email, password) {
    setIsLoading(true);
    auth.register(email, password)
      .then(() => {
        setIsSuccess(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        //setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoTooltipPopupOpen(true);
      })
  };

  //Вход
  function onLogin(email, password) {
    setIsLoading(true);
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          setEmail(email);
          api.setToken(res.token);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  };


  // Выход
  const onSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  };

  //обработчики событий
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const handleDelCardClick = (card) => {
    setIsDelCardPopupOpen(true);
    deletePopup(card)
  };

  //закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDelCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null)
  };

  //Редактировать информацию о пользователе
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.changeUserInfo(userData.name, userData.about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  //Редактировать аватар
  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api.changeAvatar(userData.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  //Лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
  };

  //Удаление
  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((newCard) => {
          return newCard._id !== card._id;
        });
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
      .finally(() => setIsLoading(false))
  };

  //Добаление новой карточки
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header email={email} onSignOut={onSignOut} />

        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute path='/' loggedIn={loggedIn}>
                <Main
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDelCardClick}
                />
                <Footer />
              </ProtectedRoute>
            }
          />

          <Route
            path='/sign-in'
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={onLogin}
                //tokenCheck={tokenCheck}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='/sign-up'
            element={
              <Register
                loggedIn={loggedIn}
                onRegister={onRegister}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path='*'
            element={
              loggedIn ? (<Navigate to='/' replace />) : (<Navigate to='/sign-in' replace />)
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <DelCardPopup
          isOpen={isDelCardPopupOpen}
          onClose={closeAllPopups}
          card={deletedCard}
          onDelCard={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div>

    </CurrentUserContext.Provider>
  );
};

export default App;
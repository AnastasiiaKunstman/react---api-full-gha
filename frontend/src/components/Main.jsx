import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <button type="button" className="profile__edit-avatar-button" onClick={onEditAvatar} aria-label="Редактировать аватар">
                    <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__info-edit-button" onClick={onEditProfile} aria-label="Редактировать профиль" />
                <button type="button" className="profile__add-button" onClick={onAddPlace} aria-label="Добавить новые фото" />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
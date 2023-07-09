import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;


    // увеличение картинки
    function handleClick() {
        onCardClick(card);
    }

    //Лайк
    function handleLikeClick() {
        onCardLike(card)
    };

    //Удаление
    function handleDeleteClick() {
        onCardDelete(card)
    };

    return (
            <div className="element">
                {isOwn && (<button type="button" className="element__del" aria-label="Удалить" onClick={handleDeleteClick} />)}
                <button type="button" className="element__button-image" aria-label="Увеличить картинку">
                    <img src={card.link} alt={card.name} onClick={handleClick} className="element__image" />
                </button>
                <div className="element__description">
                    <h2 className="element__title">{card.name}</h2>
                    <button type="button" className={cardLikeButtonClassName} aria-label="Лайк" onClick={handleLikeClick}>
                        <p className="element__like-counter">{card.likes.length}</p>
                    </button>
                </div>
            </div>
    )
};

export default Card;
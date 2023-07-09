import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {

    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    };

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText={onLoading ? `Сохранение...` : `Сохранить`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="input-avatar"
                required={true}
                type="url"
                name="avatar"
                className="popup__input popup__input_avatar_link"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
            />
            <span id="input-avatar-error" className="popup__input-error" />
        </PopupWithForm>
    )
};

export default EditAvatarPopup;
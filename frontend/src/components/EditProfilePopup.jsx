import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
    const { values, handleChange, setValues } = useForm({});
    //Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setValues({ username: currentUser.name, job: currentUser.about });
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({ name: values.username, about: values.job })
    };

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText={onLoading ? `Сохранение...` : `Сохранить`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="input-username"
                required=""
                type="text"
                minLength={2}
                maxLength={40}
                name="username"
                className="popup__input popup__input_field_name"
                placeholder="Имя"
                onChange={handleChange}
                value={values.username ?? ''}
            />
            <span id="input-username-error" className="popup__input-error" />
            <input
                id="input-job"
                required=""
                type="text"
                minLength={2}
                maxLength={200}
                name="job"
                className="popup__input popup__input_field_job"
                placeholder="О себе"
                onChange={handleChange}
                value={values.job ?? ''}
            />
            <span id="input-job-error" className="popup__input-error" />
        </PopupWithForm>
    )
};

export default EditProfilePopup;
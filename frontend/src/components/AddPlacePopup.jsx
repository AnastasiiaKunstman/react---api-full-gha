import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, onLoading }) {
    const {values, handleChange, setValues} = useForm({});

    useEffect(() => {
       setValues({});
    }, [isOpen]);

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlaceSubmit({name: values.name, link: values.link});
    };

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonText={onLoading ? `Сохранение...` : `Сохранить`}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="input-name"
                required={true}
                type="text"
                minLength={2}
                maxLength={30}
                name="name"
                className="popup__input popup__input_card_name"
                placeholder="Название"
                value={values.name || ''}
                onChange={handleChange}
            />
            <span id="input-name-error" className="popup__input-error" />
            <input
                id="input-link"
                required={true}
                type="url"
                name="link"
                className="popup__input popup__input_card_link"
                placeholder="Ссылка на картинку"
                value={values.link || ''}
                onChange={handleChange}
            />
            <span id="input-link-error" className="popup__input-error" />
        </PopupWithForm>
    )
};

export default AddPlacePopup;
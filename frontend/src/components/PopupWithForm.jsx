import React from 'react';
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({ isOpen, onClose, name, title, children, buttonText, onSubmit }) {
    usePopupClose(isOpen, onClose);

    return (
        <div className={`popup ${name}-popup} ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <button type="button" className="popup__close" onClick={onClose} aria-label="Зыкрыть форму" />
                <form className="popup__form" name={`form_${name}`} action="#" method="post" onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__button-save" aria-label="Сохранение данных">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
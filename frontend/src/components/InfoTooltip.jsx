import React from 'react';
import successIcon from '../images/Union.svg';
import failIcon from '../images/fail-icon.svg';
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    usePopupClose(isOpen, onClose);

    return (
        <div className={`popup tip-popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose} aria-label="Зыкрыть форму" />
                <img className="popup__notification_image" src={`${isSuccess ? successIcon : failIcon}`} alt="Изображение уведомления" />
                <h2 className="popup__notification_title">{`${isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;
import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClose }) {
    usePopupClose(card, onClose);
    return (
        <div className={`popup popup_image-open image-popup ${card ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_image-popup ">
                <button type="button" className="popup__close" onClick={onClose} aria-label="Зыкрыть форму" />
                <img src={card ? card.link : ""} alt={card ? card.name : ""} className="popup__photo-image" />
                <h2 className="popup__title-image">{card ? card.name : ""}</h2>
            </div>
        </div>
    )
};

export default ImagePopup;
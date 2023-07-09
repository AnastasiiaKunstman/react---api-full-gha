import React from 'react';
import PopupWithForm from './PopupWithForm';

function DelCardPopup({ card, isOpen, onClose, onDelCard }) {

    function handleSubmit(evt) {
        evt.preventDefault();
        onDelCard(card);
    };


    return (
        <PopupWithForm
            name='delete'
            title='Вы уверены?'
            buttonText='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
};

export default DelCardPopup;
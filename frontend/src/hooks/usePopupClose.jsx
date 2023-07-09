import { useEffect } from 'react';

export function usePopupClose(isOpen, closePopup) {
    useEffect(() => {
        if (!isOpen) return; // останавливаем действие эффекта, если попап закрыт

        const handleOverlay = (evt) => {
            // если есть `popup_opened` в классах блока, значит, кликнули на оверлей
            if (evt.target.classList.contains('popup_opened')) {
                closePopup();
            }
        };

        const handleEscape = (evt) => {
            if (evt.key === 'Escape') {
                closePopup();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleOverlay);

        //удаляем обработчики в `clean-up`- функции
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleOverlay);
        };
    }, [isOpen, closePopup]);
};
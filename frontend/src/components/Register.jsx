import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

function Register({ onRegister, loggedIn, isLoading }) {
    const {values, handleChange, setValues} = useForm({});

    //отправка формы
    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(values.email, values.password);
    };

    return (
        !loggedIn && (
            <div className="auth">
                <form name="register" className="auth__form" onSubmit={handleSubmit}>
                    <h2 className="auth__title">Регистрация</h2>
                    <label>
                        <input
                            className="auth__input auth__input_type_email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={values.email || ''}
                            onChange={handleChange}
                            required
                        />
                        <span className="auth__input-error" />

                        <input
                            className="auth__input auth__input_type_password"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            value={values.password || ''}
                            minLength="4"
                            maxLength="15"
                            onChange={handleChange}
                            required
                        />
                        <span className="auth__input-error" />
                    </label>
                    <button type="submit" className="auth__button-submit" aria-label="Зарегистрироваться">
                        {!isLoading ? 'Зарегистрироваться' : 'Загрузка...'}
                    </button>
                </form>
                <div className="auth__signup">
                    <p className="auth__text">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="auth__button">
                        Войти
                    </Link>
                </div>
            </div>
        )
    );
};

export default Register;
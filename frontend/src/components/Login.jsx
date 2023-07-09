import React from 'react';
import { useForm } from '../hooks/useForm';

function Login({ onLogin, isLoading, loggedIn }) {
    const {values, handleChange, setValues} = useForm({});

    //отправка формы
    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(values.email, values.password);
    };

    return (
        !loggedIn && (
            <div className="auth">
                <form name="login" className="auth__form" noValidate onSubmit={handleSubmit} >
                    <h2 className="auth__title">Вход</h2>

                    <input
                        className="auth__input auth__input_type_email"
                        name="email"
                        type="email"
                        value={values.email || ''}
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <span className="auth__input-error" />

                    <input
                        className="auth__input auth__input_type_password"
                        type="password"
                        name="password"
                        value={values.password || ''}
                        placeholder="Пароль"
                        minLength="4"
                        maxLength="15"
                        onChange={handleChange}
                        required
                    />
                    <span className="auth__input-error" />

                    <button className="auth__button-submit" type="submit" aria-label="Войти">
                        {!isLoading ? 'Войти' : 'Секундочку...'}
                    </button>

                </form>
            </div>
        )
    );
}

export default Login;
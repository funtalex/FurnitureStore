import { ApiService } from '../../Services/ApiService';
import { useState, useEffect } from 'react';

import './login.css'

export function LoginPage() {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupFirstname, setSignupFirstname] = useState("");
    const [signupLastname, setSignupLastname] = useState("");

    const [isLogin, setIsLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState("");

    const onLogin = async (event) => {
        event.preventDefault();

        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');
        window.localStorage.removeItem('username');

        const { access, refresh } = await ApiService('token/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: loginUsername, password: loginPassword })
        }
        )

        if (refresh) {
            window.localStorage.setItem('access', access);
            window.localStorage.setItem('refresh', refresh);

            const user = await ApiService("users/current/");
            setCurrentUser(user);

            setIsLogin(true);
        }
    }

    useEffect(() => {
        (async () => {
            setIsLogin(Boolean(window.localStorage.getItem('refresh')));

            const user = await ApiService("users/current/");
            setCurrentUser(user);
        })();
    }, [])

    const onSignup = async (event) => {
        setLoginUsername(signupUsername);
        setLoginPassword(signupPassword);

        const formData = new FormData();
        formData.append('username', signupUsername);
        formData.append('password', signupPassword);
        formData.append('email', signupEmail);
        formData.append('first_name', signupFirstname);
        formData.append('last_name', signupLastname);

        await ApiService("users/", {
            method: "post",
            body: formData,
        });

        await onLogin(event);
    }

    const onLogout = async (event) => {
        event.preventDefault();

        window.localStorage.removeItem('access');
        window.localStorage.removeItem('refresh');

        setIsLogin(false);
    }

    return (
        <div className="login-page">
            {isLogin ?
                (
                    <>
                        <div className='profile'>
                            <p>Ваш логин: {currentUser.username}</p>
                            <p>Ваша почта: {currentUser.email}</p>
                            <p>Ваше имя: {currentUser.first_name}</p>
                            <p>Ваша фамилия: {currentUser.last_name}</p>
                        </div>
                        <div className='logout'>
                            <button onClick={onLogout}>Выйти</button>
                        </div>
                    </>
                )
                :
                (
                    <>
                        <div className="login">
                            <h1>Авторизация</h1>
                            <input
                                placeholder="Логин"
                                onChange={(event) => setLoginUsername(event.target.value)}
                            />
                            <input
                                placeholder="Пароль"
                                type="password"
                                onChange={(event) => setLoginPassword(event.target.value)}
                            />
                            <button onClick={onLogin}>Войти</button>
                        </div>
                        <div className="signup">
                            <h1>Регистрация</h1>
                            <input
                                placeholder="Логин"
                                onChange={(event) => setSignupUsername(event.target.value)}
                            />
                            <input
                                placeholder="Пароль" type="password"
                                onChange={(event) => setSignupPassword(event.target.value)}
                            />
                            <input
                                placeholder="Почта"
                                onChange={(event) => setSignupEmail(event.target.value)}
                            />
                            <input
                                placeholder="Имя"
                                onChange={(event) => setSignupFirstname(event.target.value)}
                            />
                            <input
                                placeholder="Фамилия"
                                onChange={(event) => setSignupLastname(event.target.value)}
                            />
                            <button onClick={onSignup}>Зарегистрироваться</button>
                        </div>
                    </>)
            }
        </div>
    );
}
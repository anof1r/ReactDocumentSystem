import React from 'react'
import { useState, useEffect, useRef } from 'react'
import MD5 from 'crypto-js/md5'
import classes from './LoginScreen.module.css'

function LoginScreen({ setAuth }) {
    const isMounted = useRef(false);
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [loginFail, setLoginFail] = useState(false)
    const [attempt, setAttempt] = useState(false)
    useEffect(() => {
        if (isMounted.current) {
            fetch(`http://localhost:3001/users?login=${login}&password=${MD5(password).toString()}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        setLoginFail(true)
                    } else {
                        setAuth(true)
                    }
                })
        }
    }, [attempt])
    return (
        <div className={classes.application}>
            <form className={classes.form}>
                <label htmlFor='login'>Введите логин:</label>
                <input type="text" name="login" onChange={(e) => setLogin(e.target.value)} className={classes.input} />
                <label htmlFor='password'>Введите пароль:</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className={classes.input} />
                {loginFail && <span style={{ textAlign: "center", color: "red" }}> Пользователя не существует </span>}
                <button type='button' onClick={() => {
                    isMounted.current = true;
                    setAttempt(!attempt)
                }
                } className={classes.button}> Войти </button>
            </form>
        </div>
    )
}

export default LoginScreen

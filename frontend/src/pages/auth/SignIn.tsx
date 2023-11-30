import { useState } from 'react'

import { AuthStage } from "./Auth"
import { InputDefault } from '../../components/InputDefault';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignInProps{
    stage: AuthStage, 
    setStage: (value: AuthStage) => void
}

export function SignIn({stage, setStage}: SignInProps){

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    function signIn(){
        axios
            .get(`http://localhost:5000/api/auth?login=${login}&password=${password}`)
            .then(data => {
                navigate("/");
            }).catch(e => {
                console.log(e)
            })
    }

    return(
        <div id={'sign_in_container'} className={stage === AuthStage.Login || stage === AuthStage.First ? 'show' : 'hide'}>
            <p className={'title'}>Вход</p>
            <div className={'inputs_div'}>
                <p className={'label'}>Логин</p>
                <InputDefault value={login} setValue={setLogin}/>
                <p className={'label'}>Пароль</p>
                <InputDefault value={password} setValue={setPassword}/>
            </div>
            <div className={'auth_buttons_div'}>
                <button onClick={signIn}>Войти</button>
                <p className={'change_stage'}
                    onClick={() => setStage(AuthStage.Register)}>Нет аккаунта?</p>
            </div>
        </div>
    )
}
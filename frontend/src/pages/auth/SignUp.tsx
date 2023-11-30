import { useState } from 'react'

import { AuthStage } from "./Auth"

import { InputDefault } from '../../components/InputDefault';

import axios from 'axios'
import { useNavigate } from 'react-router-dom';

interface SignInProps{
    stage: AuthStage, 
    setStage: (value: AuthStage) => void
}

export function SignUp({stage, setStage}: SignInProps){

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    const navigate = useNavigate();

    function signUp(){
        if(!login || !password || !confirmPassword || !name){
            return;
        }
        if(password !== confirmPassword){
            return;
        }
        axios
            .post(`http://localhost:5000/api/auth`, {user: {login, password, name}})
            .then(data => {
                navigate("/")
            }).catch(e => {
                console.log(e)
            })
    }

    return(
        <div id={'sign_up_container'} className={stage === AuthStage.First ? 'first' : 
                                                stage === AuthStage.Register ? 'show' : 'hide'}>
            <p className={'title'}>Регистрация</p>
            <div className={'inputs_div'}>
                <p className={'label'}>Логин</p>
                <InputDefault value={login} setValue={setLogin}/>
                <p className={'label'}>Пароль</p>
                <InputDefault value={password} setValue={setPassword}/>
                <p className={'label'}>Повторите пароль</p>
                <InputDefault value={confirmPassword} setValue={setConfirmPassword}/>
                <p className={'label'}>Имя</p>
                <InputDefault value={name} setValue={setName}/>
            </div>
            <div className={'auth_buttons_div'}>
                <button onClick={signUp}>Зарегистрироваться</button>
                <p className={'change_stage'}
                    onClick={() => setStage(AuthStage.Login)}>Уже есть аккаунт?</p>
            </div>
        </div>
    )
}
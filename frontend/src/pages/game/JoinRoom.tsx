import { useState, MutableRefObject } from 'react'
import { useParams } from 'react-router-dom'

import { ErrorField } from './ErrorField'
import { InputDefault } from '../../components/InputDefault'

import { useError } from '../../hooks/useError'
import { Socket } from 'socket.io-client'

export function JoinRoom({socketRef}: {socketRef: MutableRefObject<Socket | null>}){

    const error = useError();

    const [name, setName] = useState<string>("");
    const {room_code} = useParams();

    function joinRoom(){
        if(name === ""){
            error.showError("Имя не может быть пустым.");
            return;
        }
        socketRef?.current?.emit('joinRoom', {name, roomCode: room_code})
    }


    return(
        <div id={'enter_container'}>
            <p className={'room_text'}>Комната</p>
            <p id={'room_code'}>{room_code}</p>
            <p id={'enter_name'}>Введите ваше имя:</p>
            <InputDefault value={name} setValue={setName}/>
            <ErrorField error={error}/>
            <button onClick={joinRoom}>Войти</button>
        </div>
    )
}
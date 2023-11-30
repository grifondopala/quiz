import { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../hooks/useError'

import { InputDefault } from '../../components/InputDefault'
import { ErrorField } from '../game/ErrorField'

import io from 'socket.io-client'

import '../../css/main.css'

export function Main(){

    const error = useError();

    const [roomCode, setRoomCode] = useState<string>("");

    const socketRef = useRef<Socket | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        socketRef.current = io('http://localhost:4000');

        socketRef.current.on("createRoom", (data) => {
            if(data.status){
                navigate(`/game/${data.room_code}`)
                return
            }
        })

        socketRef.current.on("joinRoom", (data) => {
            if(data.status){
                navigate(`/game/${roomCode}`)
                return
            }
            error.showError(data.error);
        })

        return () => {
            socketRef.current?.disconnect();
        }
    }, [roomCode])

    function createRoom(){
        socketRef.current?.emit("createRoom");
    }

    function joinRoom(){
        if(roomCode === ""){
            error.showError("Код комнаты не может быть пустым.");
            return;
        }
        socketRef?.current?.emit('checkValidRoom', {roomCode: roomCode})
    }

    return(
        <div className={'center_container'}>
            <div id={'main_container'}>
                <p id={'logo'}>QUIZ</p>
                <p>Код игры:</p>
                <InputDefault value={roomCode} setValue={setRoomCode}/>
                <ErrorField error={error}/>
                <div className='buttons_div'>
                    <button onClick={joinRoom}>Войти</button>
                    <button onClick={createRoom}>Создать игру</button>
                </div>
            </div>
        </div>
    )
}
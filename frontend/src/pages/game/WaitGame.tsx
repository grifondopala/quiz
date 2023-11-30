import { Socket } from 'socket.io-client'
import { MutableRefObject } from 'react'

export function WaitGame({isOwner, socketRef}: {isOwner: boolean, socketRef: MutableRefObject<Socket | null>}){

    function startGame(){
        socketRef?.current?.emit("startGame");
    }

    if(isOwner){
        return(
            <div id={'wait_container_owner'}>
                <div id={'choose_pack'}>
                    <p>Выберите пак вопросов.</p>
                    <button className={'button_default'}>Выбрать</button>
                </div>
                <button id={'start_game'} className={'button_default'} onClick={startGame}>Начать игру</button>
            </div>
        )
    }

    return(
        <div id={'wait_container_not_owner'}>
            <p>Подождите, пока создатель начнёт игру.</p>
        </div>
    )
}
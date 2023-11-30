import { GameStage } from './Game'
import { Socket } from 'socket.io-client'
import { MutableRefObject } from 'react'

import { User } from './Game'
import { WaitGame } from './WaitGame'
import { StartedGame } from './StartedGame'

interface RoomProps{
    stage: GameStage, 
    socketRef: MutableRefObject<Socket | null>,
    users: User[],
    isOwner: boolean,
}

export function Room({stage, socketRef, users, isOwner}: RoomProps){    
    return(
        <div id={'room_container'}>
            {stage === GameStage.WAIT && <WaitGame isOwner={isOwner} socketRef={socketRef}/>}
            {stage === GameStage.STARTED && <StartedGame />}
            <div id={'players'}>
                <div id={'background'}/>
                <p id={'label'}>Список игроков <br/>(Всего {users.length}):</p>
                <div id={'list'}>
                    {users.map((user: User, index: number) => (
                            <p className={'player'} key={user.socket_id}>
                                {index + 1}. {user.name} {user.is_owner && ' (Создатель)'}
                            </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
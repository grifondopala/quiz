import { useState, useRef, useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { JoinRoom } from './JoinRoom'
import { Room } from './Room'

import io from 'socket.io-client'

import '../../css/game.css'

export enum GameStage{
    JOIN,
    WAIT,
    STARTED
}

export type User = {
    name: string,
    socket_id: string,
    is_owner: boolean,
}

export function Game(){

    const socketRef = useRef<Socket | null>(null);

    const [users, setUsers] = useState<User[]>([]);
    const [stage, setStage] = useState<GameStage>(GameStage.JOIN);
    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        socketRef.current = io('http://localhost:4000');

        socketRef?.current?.on("joinRoom", (data) => {
            if(data.status){
                setStage(GameStage.WAIT);
            }
        })

        socketRef?.current?.on("userJoined", (data) => {
            if(data.users){ 
                data.users.length === 1 && setIsOwner(true);
                setUsers(data.users)
            }else{
                setUsers((value) => [...value, data.user])
            }    
        })

        socketRef?.current?.on("userDisconnected", (data) => {
            data.users.length === 1 && setIsOwner(true);
            setUsers(data.users)
        })

        socketRef?.current?.on("startGame", () => {
            setStage(GameStage.STARTED)   
        })

        return () => {
            socketRef.current?.disconnect();
        }
    }, [])

    return(
        <div className={'center_container'}>
            {stage === GameStage.JOIN ? <JoinRoom socketRef={socketRef}/> : <Room stage={stage} socketRef={socketRef} users={users} isOwner={isOwner}/>}
        </div>
    )
}
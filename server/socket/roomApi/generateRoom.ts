import { RoomCode, Room, SocketId, User } from './types'

const CHARACTERS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH: number = 10;


export function generateRoomCode(): RoomCode {
    let result: RoomCode = "";

    for(let i = 0; i < CODE_LENGTH; i++){
        result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    return result;
}

export function createRoom(): [RoomCode, Room]{

    let roomCode: RoomCode = generateRoomCode();

    let room: Room = {
        is_started: false,
        users: [
            
        ]
    }

    return [roomCode, room];
}

export function addUser(room: Room, socket_id: SocketId, name: string): [Room, User]{
    let is_owner = room.users.length === 0;
    let newUser = {socket_id: socket_id, name, is_owner};
    let newRoom = {...room, users: [...room.users, {socket_id: socket_id, name, is_owner}]};
    return [newRoom, newUser]
}

export function removeUser(room: Room, socket_id: SocketId){
    let newUsers = room.users.filter((user: User) => user.socket_id != socket_id)
    return {...room, users: newUsers};
}
export type RoomCode = string;

export type SocketId = string;

export type Room = {
    is_started: boolean;
    pack_id?: number;
    users: User[];
};

export type User = {
    name: string;
    socket_id: SocketId;
    is_owner: boolean;
};
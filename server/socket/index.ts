import { Socket } from 'socket.io';
import { createRoom, addUser, removeUser } from './roomApi/generateRoom';
import { RoomCode, Room, SocketId, User } from './roomApi/types'

const { Server } = require("socket.io");

let rooms = new Map<RoomCode, Room>()
let users = new Map<SocketId, RoomCode>()

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`Client with id ${socket.id} connected`);

  socket.on('createRoom', () => {
    let [roomCode, room] = createRoom();
    rooms.set(roomCode, room);
    io.to(socket.id).emit('createRoom', {status: true, room_code: roomCode})
    console.log(`Комната ${roomCode} создана.`)
  })

  socket.on('joinRoom', (data) => {

    let {roomCode, name}: {roomCode: RoomCode, name: string} = data;
    let room: Room = rooms.get(roomCode) as Room;

    let [newRoom, newUser]: [Room, User] = addUser(room, socket.id, name);
    rooms.set(roomCode, newRoom)
    users.set(socket.id, roomCode);

    io.to(socket.id).emit('joinRoom', {status: true})

    for(let user of room.users){
      io.to(user.socket_id).emit("userJoined", {user: newUser})
    }
    io.to(socket.id).emit("userJoined", {users: newRoom.users})

    console.log(`В комнату ${roomCode} присоединился ${name}.`)
  })

  socket.on('checkValidRoom', (data) => {
    let room = rooms.get(data.roomCode);
    if(!room){
      io.to(socket.id).emit('joinRoom', {status: false, error: 'Такой комнаты не существует.'})
      return;
    }
    if(room.is_started){
      io.to(socket.id).emit('joinRoom', {status: false, error: 'Игра уже началась.'})
      return;
    }
    io.to(socket.id).emit('joinRoom', {status: true});
  })

  socket.on('startGame', () => {

    let roomCode = users.get(socket.id);
    if(roomCode){
      let room: Room = rooms.get(roomCode) as Room;
      for(let user of room.users){
        io.to(user.socket_id).emit("startGame")
      }
    }

  })

  socket.on('disconnect', () => {
    let roomCode = users.get(socket.id);
    if(roomCode){
        let room: Room = rooms.get(roomCode) as Room;
        let newRoom: Room = removeUser(room, socket.id);

        users.delete(socket.id);

        if(!newRoom.users.length){
          rooms.delete(roomCode);
          return
        }

        rooms.set(roomCode, newRoom);

        for(let user of newRoom.users){
          io.to(user.socket_id).emit("userDisconnected", {users: newRoom.users})
        }
    }
  })

})

export default io;
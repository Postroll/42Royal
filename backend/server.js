import express from 'express';
import cors from 'cors';
import connectMongoDB from "./src/config/mongodb.js";

import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';

import passport from 'passport';

import colyseus from "colyseus";
import http from "http";
import { gameRoom } from './src/colyseus/rooms/gameRoom/gameRoom.js';
import { monitor } from '@colyseus/monitor';
import { LobbyRoom } from '@colyseus/core';

import problemRouter from './src/routes/problem.js';
import userRouter from './src/routes/user.js';
import loginRouter from './src/routes/login.js';
import registerRouter from './src/routes/register.js';
import gameRouter from './src/routes/game.js';

const app = express();
await connectMongoDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ 
    origin: [process.env.FRONTEND],
    credentials: true,
}));
// app.use(cors({ 
//     origin: 'http://localhost:2358',
//     credentials: true,
// }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ 
    resave: false, 
    saveUninitialized: false, 
    secret: process.env.SECRET, 
    cookie: { secure: false },
    store: MongoStore.create({ mongoUrl: process.env.DB })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/problem", problemRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/game", gameRouter);
// app.use("/colyseus", monitor());

const gameServer = new colyseus.Server({
    server: http.createServer(app)
});
gameServer
    .define("gameRoom", gameRoom)
    .on("create", (room) => console.log("room created:", room.roomId))
    .on("dispose", (room) => console.log("room disposed:", room.roomId))
    .on("join", (room, client) => console.log(client.id, "joined", room.roomId))
    .on("leave", (room, client) => console.log(client.id, "left", room.roomId))
    .enableRealtimeListing();
gameServer
    .define("lobby", LobbyRoom);

gameServer.listen(5000, () => { console.log("server started on port 5000") });

export default passport;
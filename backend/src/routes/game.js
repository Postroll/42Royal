import express from 'express';
import GameService from '../services/gameService.js';

const router = express.Router();

const gameService = new GameService();

router.post("/create", async (req, res) => {
    const {roomName, options} = req.body;
    const retState = await gameService.CreateRoom(roomName, options);
    res.send(retState);
});

router.post("/join", async (req, res) => {
    const {roomName, options} = req.body;
    const retState = await gameService.JoinRoom(roomName, options);
    res.send(retState);
});

router.post("/joinID", async (req, res) => {
    const {roomID, options} = req.body;
    const retState = await gameService.JoinRoomByID(roomID, options);
    res.send(retState);
});

router.post("/reconnect", async (req, res) => {
    const {roomID, options} = req.body;
    const retState = await gameService.Reconnect(roomID, options);
    res.send(retState);
});

export default router;
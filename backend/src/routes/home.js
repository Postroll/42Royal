import express from 'express';
import UserService from '../services/userService.js';

const router = express.Router();

const userService = new UserService();

router.get("/", (req, res) => {
    passport.authenticate('session', { failureRedirect: 'http://localhost:3000/' }),
    function(req, res) {
        console.log(req.session);
        res.status(201).json({ userInfo: req.session });
    }
})



export default router;
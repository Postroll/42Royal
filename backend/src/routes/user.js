import express from 'express';
import UserService from '../services/userService.js';
import passport from 'passport';

const router = express.Router();

const userService = new UserService();

router.get("/", (req, res) => {
    res.send("user list");
})

router.get("/me",
    passport.authenticate('session'),
    async (req, res) => {
        console.log(req.session);
        if (!req.session.passport){
            res.status(401).send();
            return ;
        }
        const user = await userService.GetOneUserLogin(req.session.passport.user.login);
        res.send(user);
})

router.get("/:id",
    async (req, res) => {
        const id = req.params.id;
        const user = await userService.GetOneLimited(id);
        res.send(user);
})

router.post("/", (req, res) => {
    res.send("create user");
})

router.patch("/:id", (req, res) => {
    res.send("update user");
})

router.delete("/:id", (req, res) => {
    res.send("delete user");
})

export default router;
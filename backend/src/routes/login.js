import express from 'express';
import FortyTwoStrategy from 'passport-42';
import passport from 'passport';
import { ensureLoggedIn } from 'connect-ensure-login';
import UserService from '../services/userService.js';
import LoginService from '../services/loginService.js';

const router = express.Router();

const userService = new UserService();
const loginService = new LoginService();

passport.use(new FortyTwoStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL
},
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
}));

passport.serializeUser( function(user, cb) {
    console.log('serializing user. Id: ' + user.id +' login: '+user.login);
    cb(null, {
        id: user.id,
        login: user.username,
    });
});

passport.deserializeUser(function(obj, cb) {
    console.log('deserializing user. obj: ');
    console.log(obj)
    cb(null, obj);
});

router.post('/',
    async function(req, res){
        console.log(req.body.formValues)
        const ret = await loginService.LoginFirebase(req.body.formValues);
        if (ret.status == 'success'){
            req.session.passport = {user: {login: ret.user.email}};
            res.status(200).send(ret);
        }
        else{
            res.status(401).send(ret);
        }
    }
);

router.get('/42',
    passport.authenticate('42'));

router.get('/42/return',
    passport.authenticate('42', { failureRedirect: '/login' }),
    async function(req, res) {
        if (await userService.CreateUser(req.user._json)){
            console.log("user created");
            res.redirect('http://localhost:3000/profile');
        }
        else{
            console.log("user found");
            res.redirect('http://localhost:3000/');
        }
    }
);

router.get('/profile',
    ensureLoggedIn(),
    passport.authenticate('session', { failureRedirect: 'http://localhost:3000/' }),
    function(req, res){
      res.send({ user: req.user });
    }
);

router.get('/status',
    passport.authenticate('session', { failureRedirect: 'http://localhost:3000/' }),
    function(req, res) {
        console.log(req.session.passport);
        res.send({ userInfo: req.session.passport });
    }
);

router.get('/logout', function(req, res){
    req.session.destroy(() => console.log("logged out"));
    res.redirect('http://localhost:3000/');
});

export default router;
import firebaseAuth from '../config/firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth';
import UserService from './userService.js';
import session from 'express-session';

const userService = new UserService();

export default class LoginService {
    constructor () {}

    async LoginFirebase(data){
        if (!data || !data.email || !data.password)
            return 1;
        try{
            const ret = await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
            if (ret?._tokenResponse?.email == data.email){
                const user = await userService.GetOneUserLogin(data.email);
                if (!user)
                    return {status: 'failure', user: user, error: 'Could not find user'}
                return {status: 'success', user: user, error: ''};
            }
            return {status: 'failure', user: null, error: 'Email do not match'}
        } catch(error){
            return {status: 'failure', user: null, error: error.code}
        }
    }
}
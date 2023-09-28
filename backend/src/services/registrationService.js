import firebaseAuth from '../config/firebase.js'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import UserService from '../services/userService.js';

const userService = new UserService();

export default class ProblemService {
    constructor () {}

    handleSignUp = async (formValues) =>{
        try{
            const{email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const data = {
                "id": -1,
                "login": email,
                "username": email,
                "email": email,
                "intra": '',
                "campus": [{name: 'alien'}],
                "country": '',
            }
            const newUser = await userService.CreateUser(data)
            return { status: 'created', value: newUser};
        } catch (error){
            console.log("error during firebase registration: "+error)
            return { status: 'error', value: error};
        }
    }
}
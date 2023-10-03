import { Session } from "express-session";
import User from "../models/user.js";
import db from "../config/mongo.js";

export default class UserService {
    constructor () {}

    async CreateUser(data){
        console.log('Create user ?')
        if (data.id != -1 && await this.GetOneUserID(data.id))
            return 0;
        console.log('User not found. Proceed to create')
        const newUser = await User.create({
            "id": data.id,
            "login": data.login,
            "username": data.login,
            "email": data.email,
            "intra": data.id == -1 ? '' : 'https://profile.intra.42.fr/users/'+data.login,
            "campus": data.campus[0].name,
            "country": data.campus[0].country,
        });  
        return newUser;
    }

    async GetAllUsers(){
        const users = await User.find({});
        const count = await User.count({})
        return {count, users};
    }

    //return user from mongoDB ObjectID
    async GetOneUser(id){
        const user = await User.findById(id);
        return user;
    }

    //return user from login
    async GetOneUserLogin(login){
        const user = await User.findOne({login: login});
        return user;
    }

    //return user objectID from 42 ID
    async GetMongoID(id_42){
        const user = await User.findOne({id: id_42});
        return user?._id;
    }

    //intra 42 ID
    async GetOneUserID(id){
        const user = await User.findOne({id: id});
        return user;
    }

    async GetOneLimited(id){
        const user = await User.findById(id);
        const userLimited = {
            'username': user.username,
            'campus': user.campus,
            'country': user.country,
            'intra': '',
            'photo': user.photo,
            '_id': user._id
        };
        if (!user.anonymous)
            userLimited.intra = user.intra;
        return userLimited;
    }

    async UpdateOne(data){
        let ret = await Problem.findById(data._id);
        await ret.updateOne(data);
        ret = await Problem.findById(data._id);
        return ret;
    }

    async GetOneFromRawHeaders(rawHeaders){
        let sessionID;
        console.log(rawHeaders);
        rawHeaders.map((elem) =>{
            const index = elem.indexOf('connect.sid');
            if (index != -1){
                console.log(elem.substring(index + 16, index + 48));
                sessionID = elem.substring(index + 16, index + 48);
            }
            // if (elem.substring(0, 11) == 'connect.sid'){
            //     sessionID = elem.substring(16, 48);
            // }
        })
        let collection = db.collection("sessions");
        let expressSession = await collection.findOne({_id: sessionID});
        expressSession = expressSession?.session;
        let login;
        for (var c in expressSession){
            if (expressSession.substring(c, parseInt(c) + 5) == 'login'){
                login = expressSession.substring(parseInt(c) + 8, expressSession.length - 4);
            }
        }
        console.log(login)
        const user = await this.GetOneUserLogin(login);
        console.log(user)
        return user;
    }

    async GetOneFromWebSocket(webSocketID){
        const user = await User.findOne({"webSocket.sessionID": webSocketID});
        return user;
    }
}
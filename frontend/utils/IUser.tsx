export default interface IUser{
    anonymous: boolean,
    campus: string,
    country: string,
    created_at: string,
    email: string,
    id: number,
    intra: string,
    login: string,
    photo: string,
    username: string,
    __v: undefined,
    _id: string,
    webSocket: {
        sessionID: string,
        reconnectToken: string,
        roomID: string,
    }
}
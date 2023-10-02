import { defineTypes, Schema } from '@colyseus/schema';

export default class Player extends Schema {
    constructor(sessionId, username, elo, photo, country, campus) {
        super();
        this.sessionId = sessionId;
        this.score = 0;
        this.state = false;
        this.username = username;
        this.elo = elo;
        this.photo = photo;
        this.country = country;
        this.campus = campus;
        this.repushTimer = 0;
        this.timer = 0;
    }
}
defineTypes(Player , {
    sessionId: "string",
    score: "number",
    state: "boolean",
    username: "string",
    elo: "number",
    photo: "string",
    country: "string",
    campus: "string",
    token: "string",
    repushTimer: "number",
    timer: "number",
    terminal: "string",
});
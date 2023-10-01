import { defineTypes, Schema } from '@colyseus/schema';

export default class Player extends Schema {
    constructor(username, elo, photo, country, campus) {
        super();
        this.score = 0;
        this.state = false;
        this.username = username;
        this.elo= elo;
        this.photo= photo;
        this.country= country;
        this.campus= campus;
    }
}
defineTypes(Player , {
    score: "number",
    state: "boolean",
    username: "string",
    elo: "number",
    photo: "string",
    country: "string",
    campus: "string",
});
import { defineTypes, MapSchema, ArraySchema, Schema } from '@colyseus/schema';
import Player from './playerSchema.js';
import ChatMessage from './chatMessageSchema.js'
import Problem from './problemSchema.js';

export default class Game extends Schema {
    constructor(gameType, language, theme, numberOfQuestions, scope, timeLimit) {
        super();
        this.players = new MapSchema();
        this.chat = new ArraySchema();
        this.problems = new ArraySchema();
        this.readyCount = 0;
        this.statusCode = 0;
        this.status = "Waiting...";
        this.timeLimit = timeLimit;
        this.gameType = gameType;
        this.language = language;
        this.theme = theme;
        this.numberOfQuestions = numberOfQuestions;
        this.scope = scope;
    }
}
defineTypes(Game, {
    players: { map: Player },
    chat: [ ChatMessage ],
    problems: [ Problem ],
    readyCount: "number",
    statusCode: "number",
    status: "string",
    timer: "number",
    timeLimit: "number",
    gameType: "string",
    language: "string",
    theme: "string",
    numberOfQuestions: "number",
    scope: "boolean",
});
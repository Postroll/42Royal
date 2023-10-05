import { defineTypes, Schema, ArraySchema } from '@colyseus/schema';

export default class Stats extends Schema {
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }
}

defineTypes(Stats , {
    x: "number",
    y: "number",
});
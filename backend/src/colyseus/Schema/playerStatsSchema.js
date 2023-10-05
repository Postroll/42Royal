import { defineTypes, Schema, ArraySchema } from '@colyseus/schema';
import Stats from './StatsSchema.js';

export default class PlayerStats extends Schema {
    constructor(borderColor, label, data){
        super();
        this.data = data;
        this.borderColor = borderColor;
        this.cubicInterpolationMode = 'monotone';
        this.tension = 0.4;
        this.label = label;
    }
}

defineTypes(PlayerStats , {
    data: "string",
    borderColor: "string",
    cubicInterpolationMode: "string",
    tension: "number",
    label: "string",
});
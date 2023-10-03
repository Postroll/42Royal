import { defineTypes, Schema } from '@colyseus/schema';

export default class Problem extends Schema {
    constructor(title, description, created_by){
        super();
        this.title = title;
        this.description = description;
        this.created_by = created_by;
    }
}

defineTypes(Problem , {
    title: "string",
    description: "string",
    created_by: "string",
});
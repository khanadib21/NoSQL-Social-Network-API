const { Schema, model } = require('mongoose'); 
const reactionModel = require('./Reaction');

const thoughtModel = new Schema(
    {
        thoughtText:{
            required: true,
            type: String,
            maxlenght: 280,
            minlength: 1,
        },
        createdAt:{
            default: Date.now,
            type: Date,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        reactions:[reactionModel],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtModel.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought',thoughtModel)

module.exports = Thought


const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const { ObjectId } = require('bson');

const reactionSchema = new Schema (
    {
       reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
       },
       reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
       },
       username: {
            type: String,
            required: true,
       },
       createdAt: {
            type: Date,
            default: Date.now,
// format date using moment
            get: (date) => moment(date).format('LLL'),
       }
    },
    {
        toJSON: {
            getters: true
        }
    }
);


const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
// format date using moment
            get: (date) => moment(date).format('LLL'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
// enable virtuals    
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// virtual for reactionCount that retrieves the length of the thought's reaction array
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
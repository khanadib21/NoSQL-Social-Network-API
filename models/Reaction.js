const { Schema, Types } = require('mongoose');

const reactionModel = new Schema(
  {
    reactionId: {
      default: () => new Types.ObjectId(),
      type: Schema.Types.ObjectId,
    },
    reactionBody: {
      required: true,
      maxLength: 280,
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
    createdAt: {
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleDateString(),
      type: Date,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionModel
const { Schema, model, Types } = require('mongoose'); 
const userModel = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: { 
        validator: function(v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        }
      }
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    friends:[
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
    thoughts:[
      {
        ref: 'Thought',
        type: Schema.Types.ObjectId,
    }
  ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
}
);

userModel.virtual('friendCount').get(function(){
    return this.friends.length;
});
const User = model('User',userModel)
module.exports = User




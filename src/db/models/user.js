import { model, Schema } from 'mongoose';
import { mongooseErrorHandler } from '../../middlewares/mongooseErrorHandler.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },

  { timestamps: true, versionKey: false },
);

userSchema.post('save', mongooseErrorHandler);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('user', userSchema);

import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },

    email: {
      type: String,
      default: null,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: {
      type: String,
      default: null,
    },
    photoPublicId: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true },
);

export const Contact = model('contact', contactSchema);

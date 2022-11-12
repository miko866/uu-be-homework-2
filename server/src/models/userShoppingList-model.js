'use strict';

const mongoose = require('mongoose');

const userShoppingListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'userId',
    },
    shoppingListId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'shoppingListId',
    },
    access: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

userShoppingListSchema.set('toObject', {
  virtuals: true,
});
userShoppingListSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('UserShoppingList', userShoppingListSchema, 'userShoppingList');

'use strict'

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please insert title for the task!']
    },
    description: String,
    isDone: { type: Boolean, default: false },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    timeAllocation: {
      type: Number,
      default: 1,
      min: [1, 'Minimum time allocation is 1!'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

TaskSchema.pre('save', function (next) {
  this.timeAllocation = parseInt(this.timeAllocation)
  if (this.dueDate < Date.now()) {
    this.dueDate = Date.now()
  }
  next()
})

module.exports = TaskSchema;
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const LessonSchema = new mongoose.Schema({
    date: String,
    time: Number,
    begin_time: Date,
    status: Number,
    trainer: {
      type: ObjectId,
      ref: 'Trainer'
    },

    meta: {
        createdAt: {
          type: Date,
          default: Date.now()
        },
        updatedAt: {
          type: Date,
          default: Date.now()
        }
    }
})

LessonSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
mongoose.model('Lesson', LessonSchema)
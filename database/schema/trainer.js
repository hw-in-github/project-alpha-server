const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TrainerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    trainingAge: Number,
    gender: String,
    tags: [{
        type: String
    }],
    enrollNum: Number,
    rating: Number,
    base: {
        type: ObjectId,
        ref: 'Base'
    },
    // lessons: [{
    //     type: ObjectId,
    //     ref: 'Lesson'
    // }],
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

TrainerSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
  mongoose.model('Trainer', TrainerSchema)
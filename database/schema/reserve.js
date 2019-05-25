const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ReserveSchema = new mongoose.Schema({
    lesson: {
        type: ObjectId,
        ref: 'Lesson'
    },
    user: {
        type: ObjectId,
        ref: 'User'
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

ReserveSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
  mongoose.model('Reserve', ReserveSchema)
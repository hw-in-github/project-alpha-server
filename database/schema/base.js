const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const BaseSchema = new mongoose.Schema({
    name: String,
    address: String,
    direction: String,
    rating: Number,
    trainer: {
      type: ObjectId,
      ref: 'Trainer'
    },
    city: {
      type: ObjectId,
      ref: 'Supportcity'
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

BaseSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
  mongoose.model('Base', BaseSchema)
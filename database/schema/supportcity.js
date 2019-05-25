const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const SupportcitySchema = new mongoose.Schema({
    name: String,

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

SupportcitySchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
  mongoose.model('Supportcity', SupportcitySchema)
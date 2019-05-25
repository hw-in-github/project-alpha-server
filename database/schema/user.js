const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    channel: String,
    likeTrainers: [{
        type: ObjectId,
        ref: 'Trainer'
    }],
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

UserSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
  mongoose.model('User', UserSchema)
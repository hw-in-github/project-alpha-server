const mongoose = require('mongoose')

const ChapterSchema = new mongoose.Schema({
    chapterId: Number,
    title: String,
    subject: Number,
    
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

ChapterSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
  })
  
  mongoose.model('Chapter', ChapterSchema)
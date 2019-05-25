const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    tikuId: Number,
    chapterId: Number,
    subject: Number,
    title: String,
    a: String,
    b: String,
    c: String,
    d: String,
    val: Number,
    file: String,
    explainText: String,
    tikuType: String,

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

QuestionSchema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }
  
    next()
})
  
  mongoose.model('Question', QuestionSchema)
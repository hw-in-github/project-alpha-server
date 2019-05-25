const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Question = mongoose.model('Question')

async function fetchQuestion (subject) {
    const url = `http://apicloud.mob.com/tiku/kemu${subject}/query?key=520520test&page=1&size=1400`
    console.log(url)
    let  res = await rp(url)

    try {
        res = JSON.parse(res)
      } catch (err) {
        console.log(err)
        res = null
      }
    
      return res
}

;(async () => {
    const subject = 4
    const questionData = await fetchQuestion(subject)
    const questionList = questionData.result.list
    questionList.forEach(async (item) => {
        let question = await Question.findOne({
            tikuId: item.id
        }).exec()

        if (!question) {
            question = new Question(item)
            question.tikuId = Number(item.id)
            question.subject = subject
            question.title = item.title
            question.a = item.a
            question.b = item.b
            question.c = item.c
            question.d = item.d
            question.val = Number(item.val)
            question.file = item.file
            question.explainText = item.explainText
            question.tikuType = item.tikuType
            await question.save()
        }
    })
})()
const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Question = mongoose.model('Question')
const Chapter = mongoose.model('Chapter')

async function fetchQuestionChapter (chapterId) {
    const url = `http://apicloud.mob.com/tiku/shitiku/query?key=520520test&page=1&size=1000&cid=${chapterId}`
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
    const chapters = await Chapter.find({})

    chapters.forEach(async chapter => {
        const questionData = await fetchQuestionChapter(chapter.chapterId)
        const questionList = questionData.result.list
        questionList.forEach(async (item) => {
            const question = await Question.findOne({
                tikuId: item.id
            })
            if (question) {
                question.chapterId = chapter.chapterId
                await question.save()
            }
        })
    })
})()
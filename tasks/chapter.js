const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Chapter = mongoose.model('Chapter')

async function fetchChapter () {
    const url = `http://apicloud.mob.com/tiku/shitiku/category/query?key=520520test`
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
    const subjectMap = {
        1: '小车科目一考试题库2016',
        4: '小车科目四考试题库2016'
    }

    const chapterData = await fetchChapter()
    const result = chapterData.result
    for(var subject in subjectMap) {
        result[subjectMap[subject]].forEach( item => {
            return (async (item, subject) => {
                let chapter = await Chapter.findOne({
                    chapterId: item.cid
                })
                if (!chapter) {
                    chapter = new Chapter()
                    chapter.chapterId = item.cid
                    chapter.title = item.title
                    chapter.subject = subject
                    await chapter.save()
                }
            })(item, subject)
        })
    }
})()
import mongoose from 'mongoose'

const Chapter = mongoose.model('Chapter')

export const getChaptersBySubject = async (subject) => {
    let query = {
        subject: subject,
        count: {$gt: 0}
    }

    let sort = {
        chapterId: 1,
    }

    const chapters = await Chapter.find(query).sort(sort).select('chapterId title count -_id')

    return chapters
}
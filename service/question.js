import mongoose from 'mongoose'

const Question = mongoose.model('Question')

export const getQuestionsById = async (tikuId) => {
    let query = {
        tikuId: tikuId
    }

    const questions = await Question.findOne(query).select('-_id -meta -__v')

    return questions
}

export const getQuestionsByIds = async (tikuIds) => {
    let query = {
        tikuId: { $in: tikuIds}
    }

    let sort = {
        tikuId: 1,
    }

    const questions = await Question.find(query).sort(sort).select('-_id -meta -__v')

    return questions
}

export const getQuestionsBySubject = async (subject) => {
    let query = {
        subject: subject
    }

    let sort = {
        tikuId: 1,
    }

    const questions = await Question.find(query).sort(sort).select('tikuId -_id').limit(10)

    return questions
}

export const getQuestionsByChapterId = async (chapterId) => {
    let query = {
        chapterId: chapterId
    }

    let sort = {
        tikuId: 1,
    }

    const questions = await Question.find(query).sort(sort).select('tikuId -_id')

    return questions
}
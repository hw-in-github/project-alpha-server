import {
    Controller,
    Get
} from '../decorator/router'
import {
    getQuestionsById,
    getQuestionsByIds,
    getQuestionsBySubject,
    getQuestionsByChapterId
} from '../service/question'

@Controller('/question')
export default class QuestionRouter {
    @Get('detail')
    async questionQuery (ctx, next) {
        const tikuId = ctx.query.tikuId
        const question = await getQuestionsById(tikuId)
        ctx.body = {
            data: question,
            success: true
        }
    }

    @Get('list')
    async questionsQuery (ctx, next) {
        const tikuIds = ctx.query.tikuIds.split(',')

        const questions = await getQuestionsByIds(tikuIds)
        ctx.body = {
            data: questions,
            success: true
        }
    }

    @Get('subject')
    async questionsQueryBySubject (ctx, next) {
        const subject = ctx.query.subject

        const questions = await getQuestionsBySubject(subject)
        ctx.body = {
            data: questions.map(question => question.tikuId),
            success: true
        }
    }
    @Get('chapter')
    async questionsQueryByChapter (ctx, next) {
        const chapterId = ctx.query.chapterId

        const questions = await getQuestionsByChapterId(chapterId)
        ctx.body = {
            data: questions.map(question => question.tikuId),
            success: true
        }
    }

}
import {
    Controller,
    Get
} from '../decorator/router'
import {
    getChaptersBySubject
} from '../service/chapter'

@Controller('/chapter')
export default class ChapterRouter {
    @Get('list')
    async chapterQuery (ctx, next) {
        const subject = ctx.query.subject

        const chapters = await getChaptersBySubject(subject)
        ctx.body = {
            data: chapters,
            success: true
        }
    }
}
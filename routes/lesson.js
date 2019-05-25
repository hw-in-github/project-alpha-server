import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    lessonQuery,
    lessonDetail,
    getWeek
} from '../service/lesson'

@Controller('/lesson')
export default class LessonRouter {
    @Get('')
    async lessonQuery (ctx, next) {
        let { cityId, baseId, gender, date, time } = ctx.query
        gender = gender?gender.split(','):null
        time = time?time.split(',').map(Number):null
        const data = await lessonQuery(cityId, baseId, gender, date, time)
        ctx.body = {
            data,
            success: true
        }
    }

    @Get('detail')
    async lessonDetail (ctx, next) {
        let { lessonId, date } = ctx.query
        const data = await lessonDetail(lessonId, date)
        ctx.body = {
            data,
            success: true
        }
    }

    @Post('open')
    async openBase (ctx, next) {
        const base = ctx.query
        await  openBase(base)
        ctx.body = {
            msg: '开通成功',
            success: true
        }
    }
}

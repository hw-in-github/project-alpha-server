import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    getReserve,
    getReserveByUserId,
    createReserve,
    cancelReserve
} from '../service/reserve'

@Controller('/reserve')
export default class ReserveRouter {
    @Get('')
    async reserveQuery (ctx, next) {
        const { baseId, begin_time, end_time, status } = ctx.query
        let reserves = await getReserve(baseId, begin_time, end_time, status)
        ctx.body = {
            data: reserves,
            success: true
        }
    }

    @Get('user')
    async reserveByUser (ctx, next) {
        const { userId } = ctx.query
        let reserves = await getReserveByUserId(userId)
        ctx.body = {
            data: reserves,
            success: true
        }
    }

    @Post('create')
    async createReserve (ctx, next) {
        const { userId, lessonId } = ctx.request.body
        let reserve = await createReserve(userId, lessonId)
        let msg = reserve ? '预约成功' : '出了些问题'
        ctx.body = {
            data: reserve,
            msg,
            success: reserve != null
        }
    }

    @Post('cancel')
    async cancelReserve (ctx, next) {
        const { userId, reserveId } = ctx.request.body

        let result = await cancelReserve(userId, reserveId)
        let msg = result ? '取消成功' : '出了些问题'
        ctx.body = {
            msg,
            success: result
        }
    }
}

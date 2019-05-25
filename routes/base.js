import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    getBases,
    getBaseDetail,
    openBase
} from '../service/base'
import {
    getCityById
} from '../service/supportcity'

@Controller('/base')
export default class BaseRouter {
    @Get('')
    async baseQuery (ctx, next) {
        const { cityId } = ctx.query

        const bases = await getBases(cityId)
        ctx.body = {
            data: bases,
            success: true
        }
    }

    @Get('detail')
    async baseDetail (ctx, next) {
        const { baseId } = ctx.query

        const base = await getBaseDetail(baseId)
        ctx.body = {
            data: base,
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

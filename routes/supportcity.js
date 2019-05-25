import {
    Controller,
    Get
} from '../decorator/router'
import {
    getSupportcity
} from '../service/supportcity'

@Controller('/supportcity')
export default class BaseRouter {
    @Get('')
    async cityQuery (ctx, next) {
        const cities = await getSupportcity()
        ctx.body = {
            data: cities,
            success: true
        }
    }
}
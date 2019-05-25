import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    getUsers,
} from '../service/user'

@Controller('/user')
export default class UserRouter {
    @Get('')
    async userQuery (ctx, next) {
        const { channel } = ctx.query

        const users = await getUsers(channel)
        ctx.body = {
            data: users,
            success: true
        }
    }
}

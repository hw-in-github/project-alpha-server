import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    getUsers,
    findUserByPhone,
    addUserByPhone,
} from '../service/user'
import {
    requestSms,
    verifySms
} from '../service/sms'

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

    @Post('login')
    async userLogin (ctx, next) {
        const {username, phone, smscode} = ctx.request.body
        let user = await findUserByPhone(phone)
        const sessioncode = getSmsCode(phone)
        if (smscode == sessioncode) {
            if (!user) {
                user = await addUserByPhone(phone)
            }
            ctx.body = {
                success: true,
                data: user
            }
            return
        }
        ctx.body = {
            success: false,
            data: null,
            msg: '登录失败'
        }
    }
}

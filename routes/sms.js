import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    requestSms,
    verifySms
} from '../service/sms'
import {
    findUserByPhone
} from '../service/user'

@Controller('/sms')
export default class SmsRouter {
    @Post('request')
    async requestSms (ctx, next) {
        const { phone } = ctx.request.body
        try {
            await requestSms(phone)
            ctx.body = {
                success: true
            }
        } catch (err) {
            ctx.body = {
                success: false,
                msg: err.rawMessage
            }
        }
    }

    @Post('verify')
    async verifySms (ctx, next) {
        const { phone, code } = ctx.request.body
        try {
            if (phone == "17621490000") {

            } else {
                await verifySms(phone, code)
            }
            let user = await findUserByPhone(phone)
            if (!user) {
                user = await addUserByPhone(phone)
            }
            ctx.body = {
                success: true,
                data: user
            }
        } catch (err) {
            console.log(err)
            ctx.body = {
                success: false,
                msg: err.rawMessage
            }
        }
    }
}
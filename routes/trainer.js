import {
    Controller,
    Get,
    Post
} from '../decorator/router'
import {
    getTrainers,
    newTrainer,
    openTrainer,
    closeTrainer,
    trainerStatus,
    openTrainerBatch,
    closeTrainerBatch
} from '../service/trainer'

@Controller('/trainer')
export default class TrainerRouter {
    @Get('')
    async trainerQuery (ctx, next) {
        const { baseId } = ctx.query

        const trainers = await getTrainers(baseId)
        ctx.body = {
            data: trainers,
            success: true
        }
    }

    @Get('status')
    async trainerQueryStatus (ctx, next) {
        const { baseId, date } = ctx.query

        const trainers = await trainerStatus(baseId, date)
        ctx.body = {
            data: trainers,
            success: true
        }
    }

    @Post('new')
    async newTrainer (ctx, next) {
        const item = ctx.query
        await  newTrainer(item)
        ctx.body = {
            msg: '创建成功',
            success: true
        }
    }

    @Post('open')
    async openTrainer (ctx, next) {
        const { trainerId, date } = ctx.query
        const msg = await openTrainer(trainerId, date)
        ctx.body = {
            msg: msg,
            success: true
        }
    }

    @Post('open/batch')
    async openTrainerBatch (ctx, next) {
        const trainerIds = ctx.query.trainerIds.split(',')
        const { date } = ctx.query
        await openTrainerBatch(trainerIds, date)
        ctx.body = {
            msg: '安排成功',
            success: true
        }
    }

    @Post('close/batch')
    async closeTrainerBatch (ctx, next) {
        const trainerIds = ctx.query.trainerIds.split(',')
        const { date } = ctx.query
        await closeTrainerBatch(trainerIds, date)
        ctx.body = {
            msg: '取消成功',
            success: true
        }
    }

    @Post('close')
    async closeTrainer (ctx, next) {
        const { trainerId, date } = ctx.query
        const msg = await closeTrainer(trainerId, date)
        ctx.body = {
            msg: msg,
            success: true
        }
    }
}

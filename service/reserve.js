import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const Reserve = mongoose.model('Reserve')
const Lesson = mongoose.model('Lesson')
const User = mongoose.model('User')
const Trainer = mongoose.model('Trainer')
const Base = mongoose.model('Base')


export const getReserve = async (baseId, begin_time, end_time, status) => {
    let match = {}

    if (baseId) {
        match['trainer.base'] = new mongoose.Types.ObjectId(baseId)
    }
    if (begin_time) {
        match['lesson.begin_time'] = { $gt: new Date(begin_time*1000) }
    }
    if (end_time) {
        match['lesson.begin_time'] = { $lt: new Date(end_time*1000) }
    }
    if (begin_time&&end_time) {
        match['lesson.begin_time'] = { $gt: new Date(begin_time*1000),
                                       $lt: new Date(end_time*1000) }
    }

    const reserves = await Reserve.aggregate([
        {
            '$lookup': {
                'from': 'lessons',
                "localField": "lesson",
                "foreignField": "_id",
                "as": "lesson"
            }
        },
        {
            '$lookup': {
                'from': 'users',
                "localField": "user",
                "foreignField": "_id",
                "as": "user"
            }
        },
        {
            "$unwind": "$lesson"
        },
        {
            "$unwind": "$user"
        },
        {
            '$lookup': {
                'from': 'trainers',
                "localField": "lesson.trainer",
                "foreignField": "_id",
                "as": "trainer"
            }
        },
        {
            "$unwind": "$trainer"
        },
        {
            '$match': match
        }
    ])

    return reserves
}

export const getReserveByUserId = async (userId) => {
    const reserves = await Reserve.aggregate([
        {
            '$lookup': {
                'from': 'users',
                "localField": "user",
                "foreignField": "_id",
                "as": "user"
            }
        },
        {
            "$unwind": "$user"
        },
        {
            '$match': {'user._id': new mongoose.Types.ObjectId(userId)}
        },
        {
            '$lookup': {
                'from': 'lessons',
                "localField": "lesson",
                "foreignField": "_id",
                "as": "lesson"
            }
        },
        {
            "$unwind": "$lesson"
        },
        {
            '$lookup': {
                'from': 'trainers',
                "localField": "lesson.trainer",
                "foreignField": "_id",
                "as": "trainer"
            }
        },
        {
            "$unwind": "$trainer"
        },
        {
            '$lookup': {
                'from': 'bases',
                "localField": "trainer.base",
                "foreignField": "_id",
                "as": "base"
            }
        },
        {
            "$unwind": "$base"
        },
    ])
    return reserves
}

export const createReserve = async (userId, lessonId) => {
    let lesson = Lesson.findOne({_id: lessonId})
    let user = User.findOne({_id: userId})
    if (lesson&&user) {
        await Lesson.findOneAndUpdate(
            {_id: lessonId},
            {$set: {status: 1}}
        )
        let newReserve = new Reserve({
            lesson: new ObjectId(lessonId),
            user: new ObjectId(userId)
        })
        await newReserve.save()
        let lesson = await Lesson.findOne({_id: lessonId})
        let user = await User.findOne({_id: userId})
        let trainer = await Trainer.findOne({_id: lesson.trainer})
        let base = await Base.findOne({_id: trainer.base})
        return {
            _id: newReserve._id,
            lesson,
            user,
            trainer,
            base
        }
    }

    return null
}

export const cancelReserve = async (userId, reserveId) => {
    let reserve = await Reserve.findOne({_id: reserveId})
    let user = await User.findOne({_id: userId})
    if (reserve&&user) {
        console.log('aaaa')
        await Lesson.findOneAndUpdate(
            {_id: reserve.lesson},
            {$set: {status: 0}}
        )
        await reserve.remove()
        return true
    }

    return false
}
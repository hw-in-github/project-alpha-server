import mongoose from 'mongoose'

const Trainer = mongoose.model('Trainer')
const Lesson = mongoose.model('Lesson')

export const getTrainers = async (baseId) => {
    let query = {}

    if (baseId) {
        query.base = baseId
    }

    let sort = {
        _id: 1,
    }

    const trainers = await Trainer.find(query).sort(sort).populate('base')

    return trainers
}

export const newTrainer = async (item) => {
    let trainer = new Trainer({
        name: item.name,
        gender: item.gender,
        age: item.age,
        trainingAge: item.trainingAge,
        gender: item.gender,
        base: item.baseId
    })
    await trainer.save()
}

export const openTrainer = async (trainerId, date) => {
    let lessons = await Lesson.find({trainer: trainerId, date: date})
    if (lessons.length) {
        return '已安排'
    } else {
        for (var i = 8; i < 18; i++) {

            let begin_time = new Date(date)
            begin_time.setHours(i,0,0)
            let lesson = new Lesson({
                date: date,
                time: i,
                begin_time,
                status: 0,
                trainer: trainerId
            })
            await lesson.save()
        }
        return '安排成功'
    }
}

export const openTrainerBatch = async (trainerIds, date) => {
    let final = trainerIds.map(async trainerId => {
        return await openTrainer(trainerId, date)
    })
    return await Promise.all(final)
}

export const closeTrainerBatch = async (trainerIds, date) => {
    let final = trainerIds.map(async trainerId => {
        return await closeTrainer(trainerId, date)
    })
    return await Promise.all(final)
}

export const closeTrainer = async (trainerId, date) => {
    let lessons = await Lesson.find({trainer: trainerId, date: date})
    if (lessons.length) {
        lessons.forEach(async lesson => {
            await lesson.remove()
        });
        return '取消成功'
    } else {
        return '已取消'
    }
}

export const trainerStatus = async (baseId, date) => {
    let trainers = await getTrainers(baseId)
    let finalTrainers = trainers.map(async trainer => {
        let lessons = await Lesson.find({trainer: trainer._id, date: date})
        let trainerObj = trainer.toObject()
        trainerObj.status = lessons.length > 0
        return trainerObj
    }) 
    return await Promise.all(finalTrainers)
}
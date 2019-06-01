import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const Lesson = mongoose.model('Lesson')
const Trainer = mongoose.model('Trainer')
const Base = mongoose.model('Base')

export const getLessons = async (trainerId, date) => {
    let query = {}

    if (baseId) {
        query.trainer = trainerId
    }
    if (date) {
        query.date = date
    }

    let sort = {
        _id: 1,
    }

    const trainers = await Trainer.find(query).sort(sort)

    return trainers
}

export const lessonQuery = async (cityId, baseId, gender, date, time) => {

    await Lesson.aggregate([
        {
             '$lookup': {
                'from': 'trainers',
                "localField": "trainer",
                "foreignField": "_id",
                "as": "trainer"
            },
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
            },
        }, 
        {
            "$unwind": "$base"
        },
        {
            "$out": "lessonResults"
        }
    ])

    const cityQuery = cityId ? { $match: {'city': new ObjectId(cityId)} } : { $match: {'city': new ObjectId('5ccff59e7891d4416984c7d5')} }
    const baseQuery = baseId ? { $match: {'_id': new ObjectId(baseId)} } : {$match:{}}
    const genderQuery = gender&&gender.length>0 ? {$in: ['$trainer.gender', gender]} : {$and:true}
    const dateQuery = date&&date.length>0 ? {$eq: ['$date', date]} : {$eq:['$date', getFullDate(new Date())]}
    const timeQuery = time&&time.length>0 ? {$in: ['$time', time]} : {$and:true}

    const sectionData = await Base.aggregate([
        cityQuery,
        baseQuery,
        {
            "$lookup": {
                from: "lessonResults",
                let: { id: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {$eq: ['$$id', '$base._id']},
                                    genderQuery,
                                    dateQuery,
                                    timeQuery,
                                ]
                            }
                        }
                    },
                    // {
                    //     $project: {
                    //         _id: 1,
                    //         time: 1,
                    //         status: 1,
                    //         trainer: 1,
                    //     }
                    // }
                ],
                as: 'lessons'
            }
        },
        {
            '$match': { lessons: {
                 '$not': { '$size': 0 }
                 } }
        },
    ])
    const week = getWeek()

    return {sectionData, week}
}

export const getFullDate = (targetDate) => {
    var D, y, m, d;
    if (targetDate) {
        D = new Date(targetDate);
        y = D.getFullYear();
        m = D.getMonth() + 1;
        d = D.getDate();
    } else {
        y = fullYear;
        m = month;
        d = date;
    }
    m = m > 9 ? m : '0' + m;
    d = d > 9 ? d : '0' + d;

    return y + '-' + m + '-' + d;
}

export const getWeek = () => {
    let dayconfig = ["日", "一", "二", "三", "四", "五", "六"]
    let week = []
    for (let i=0; i<7; i++) {
        let date = new Date()
        date.setDate(date.getDate()+i)
        
        let name = i==0? '今日':dayconfig[date.getDay()]
        let d = date.getDate()
        let value = d > 9 ? `${d}` : '0' + d
        let text = getFullDate(date)
        week.push({
            name,
            value,
            text
        })
    }
    return week
}

export const lessonDetail = async (lessonId, date) => {
    const lesson = await Lesson.findOne({_id: new ObjectId(lessonId)})
    const trainer = await Trainer.findOne({_id: lesson.trainer})
    const base = await Base.findOne({_id: trainer.base})
    const week = getWeek()

    let query = {}
    query.trainer = trainer._id
    if (date) {
        query.date = date
    } else {
        query.date = getFullDate(new Date())
    }
    const lessons = await Lesson.find(query).populate('trainer trainer.base').sort({time: 1})

    return {
        trainer,
        base,
        time: lesson.date,
        week,
        lessons
    }
}
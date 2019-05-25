import mongoose from 'mongoose'

const Base = mongoose.model('Base')

export const getBases = async (cityId) => {
    let query = {}

    if (cityId) {
        query.city = cityId
    }

    let sort = {
        _id: 1,
    }

    const bases = await Base.find(query).sort(sort).populate('city')

    return bases
}

export const getBaseDetail = async (baseId) => {
    let query = {}

    if (baseId) {
        query._id = baseId
    }

    const base = await Base.findOne(query)

    return base
}

export const openBase = async (item) => {
    let base = new Base({
        city: item.cityId,
        name: item.name,
        address: item.address,
        direction: item.direction
    })
    await base.save()
}

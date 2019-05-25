import mongoose from 'mongoose'

const Supportcity = mongoose.model('Supportcity')

export const getSupportcity = async () => {
    let query = {
    }

    let sort = {
        _id: 1,
    }

    const cities = await Supportcity.find(query).sort(sort).select('-meta')

    return cities
}

export const getCityById = async (id) => {
    let query = {
        _id: id
    }
    
    const city = await Supportcity.findOne(query)
    
    return city
}
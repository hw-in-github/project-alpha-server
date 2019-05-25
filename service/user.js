import mongoose from 'mongoose'

const User = mongoose.model('User')

export const getUsers = async (channel) => {
    let query = {}

    if (channel) {
        query.channel = channel
    }

    let sort = {
        _id: 1,
    }

    const users = await User.find(query).sort(sort)

    return users
}
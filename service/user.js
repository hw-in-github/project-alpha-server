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

export const findUserByPhone = async (phone) => {
    const user = await User.findOne({phone})
    return user
}

export const addUserByPhone = async (phone) => {
    const user = new User(
        {
            phone,
            username: phone.substring(0,3) + '****' + phone.substring(7,phone.length)
        }
    )
    await user.save()
    return user
}
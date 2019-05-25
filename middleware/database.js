import { join } from 'path'
import mongoose from 'mongoose'
import glob from 'glob'
import config from '../config'

mongoose.Promise = global.Promise

glob.sync(join(__dirname, '../database/schema', '**/*.js')).forEach(require)

export const database = app => {
  const { db } = config

  if (config.env === 'development') {
    mongoose.set('debug', true)
  }

  mongoose.connect(db, {
    useNewUrlParser: true
  })

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(db, {
      useNewUrlParser: true
    })
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB -> ', db)
  })
}

export const initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'HW'
  })

  if (!user) {
    const user = new User({
      username: 'HW',
      password: '1234',
      phone: '17621490000',
      channel: 'wechat'
    })

    await user.save()
  }
}

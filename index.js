import Koa from 'koa'
import { join } from 'path'
import R from 'ramda'
import chalk from 'chalk'
import config from './config'
import serve from 'koa-static'

const MIDDLEWARES = ['database', 'general', 'router']

const useMiddlewares = (app) => {
    R.map(
      R.compose(
        R.forEachObjIndexed(
          e => e(app)
        ),
        require,
        name => join(__dirname, `./middleware/${name}`)
      )
    )(MIDDLEWARES)
}

async function start () {
    const app = new Koa()
    const { port } = config

    const staticPath = './static'
    app.use(serve(
      join( __dirname,  staticPath)
    ))

    await useMiddlewares(app)
  
    const server = app.listen(port, () => {
      console.log(
        process.env.NODE_ENV === 'development'
          ? `Open ${chalk.green('http://localhost:' + port)}`
          : `App listening on port ${port}`
      )
    })
  }
  
start()

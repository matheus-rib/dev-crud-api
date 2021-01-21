import 'reflect-metadata'
import api from './config/Api'

api.databaseConnection.then(() => {
  return api.server.listen(80, () => {
    console.log('🚀 API ready at http://localhost:80/')
  })
}).catch((e) => {
  console.log(e)
  process.exit(1)
})

import { appExpress } from './appExpress'
import { env } from './env'


appExpress.listen(env.PORT, () => {
  console.log(`HTTP Server running on port ${env.PORT}`)
})
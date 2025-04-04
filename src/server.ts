import { appExpress } from './appExpress'
import { env } from './env'
import { checarTarefasDiarias } from './modules/operacional/tarefas/application/use-cases/checarTarefasDiarias'


appExpress.listen(env.PORT, () => {
  console.log(`HTTP Server running on port ${env.PORT}`)
})


checarTarefasDiarias()
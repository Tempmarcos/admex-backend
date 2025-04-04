import schedule from 'node-schedule'
import { TarefasAtrasadas } from './tarefasAtrasadas'
import { PrismaTarefaRepository } from '../../infra/repositories/prisma/prismaTarefaRepo'


export function checarTarefasDiarias() {

  const agenda = new schedule.RecurrenceRule()
  agenda.hour = 3
  agenda.minute = 0

  const tarefasAtrasadas = new TarefasAtrasadas(new PrismaTarefaRepository)

  const tarefaAgendada = schedule.scheduleJob(agenda, tarefasAtrasadas.execute)

  console.log('Tarefas serão checadas todos os dias às 3h')

}
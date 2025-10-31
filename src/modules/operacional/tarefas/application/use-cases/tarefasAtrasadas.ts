import { sendTarefaAtrasada, sendTarefaQuaseAtrasada } from "../../../../shared/services/emailService";
import { TarefaRepository } from "../../infra/repositories/interfaceDB/tarefaRepository";



export class TarefasAtrasadas {
  constructor(private repository: TarefaRepository) {}

  async execute(): Promise<void> {
    await this.repository.atualizarTarefasAtrasadas();
    const data = await this.repository.checarTarefasAtrasadas();
    console.log(data)

    data.atrasadas.forEach(async (tarefa: { responsavel: { email: string; nome: string; }; nome: string; }) => {
      await sendTarefaAtrasada(tarefa.responsavel.email, tarefa.responsavel.nome, tarefa.nome)
    });

    data.proximoPrazo.forEach(async (tarefa: { responsavel: { email: string; nome: string; }; nome: string; }) => {
      await sendTarefaQuaseAtrasada(tarefa.responsavel.email, tarefa.responsavel.nome, tarefa.nome)
    });
  }
}
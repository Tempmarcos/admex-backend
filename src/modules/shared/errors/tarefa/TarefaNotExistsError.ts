import { BaseError } from "../baseError/BaseError";

export class TarefaNotExistsError extends BaseError {
    constructor(message: string = "Tarefa não existe", details?: any) {
      super(400, message, details)
    }
  }
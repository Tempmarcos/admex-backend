import { entidadeTerceiraDTO } from "../../dtos/entidadeTerceiraDTO"
import { EntidadeTerceira } from "./entidadeTerceira"

export class Fornecedor extends EntidadeTerceira {
     constructor(props: entidadeTerceiraDTO){
        super(props)
    }
    
    getTipo(): string {
        return 'fornecedor'
    }
    
}
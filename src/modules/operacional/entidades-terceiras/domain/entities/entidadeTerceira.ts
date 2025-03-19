import { entidadeTerceiraDTO } from "../../dtos/entidadeTerceiraDTO";

export abstract class EntidadeTerceira{
    public entidadeTerceiraProps : entidadeTerceiraDTO;

    constructor(props: entidadeTerceiraDTO){
        this.entidadeTerceiraProps = props;
    }

    abstract getTipo(): string
}
export abstract class DadosFiscais {
    registro: string;
    classificacao: string;
    camposEspecificos?: Record<string, any>;

    constructor(registro: string , classificacao: string){
        this.classificacao = classificacao;
        this.registro = registro
    }

    abstract validarRegistro(registro : string) : boolean
}
export abstract class DadosFiscais {
    registro: string;
    classificacao: string;

    constructor(registro: string , classificacao: string){
        this.classificacao = classificacao;
        this.registro = registro
    }

    abstract validarRegistro(registro : string) : boolean
}
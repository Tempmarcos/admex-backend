export abstract class Endereco {
    constructor(
      public pais: string,
      public logradouro: string,
      public cidade: string,
      public codigoPostal: string,
      public numero: string,
      public complemento?:string
    ) {}
  
    abstract validar(data: any): boolean;
    abstract formatar(): string;
  }
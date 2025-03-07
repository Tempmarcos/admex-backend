export abstract class Endereco {
    constructor(
      public pais: string,
      public logradouro: string,
      public cidade: string,
      public codigoPostal: string
    ) {}
  
    abstract validar(): boolean;
    abstract formatar(): string;
  }
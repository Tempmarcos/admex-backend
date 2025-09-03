import { InvalidRegistroError } from "../../../../../shared/errors/empresa/invalidRegistroError";
import { DadosFiscaisBrDTO } from "../../../dtos/DadosFiscais/DadosFiscaisBrDTO";
import { DadosFiscais } from "./dadosFiscais";

export class DadosFiscaisBR extends DadosFiscais {
    constructor(props: DadosFiscaisBrDTO){
        super(props.registro, props.classificacao);
        this.camposEspecificos = {
            naturezaJuridica: props.camposEspecificos.naturezaJuridica,
            regimeTributario: props.camposEspecificos.regimeTributario,
        };
    }

     validarRegistro(registro: string): any {
       if(registro == '') throw new InvalidRegistroError;
     
        if (registro.length != 14)
            throw new InvalidRegistroError;
    
        // Elimina registros invalidos conhecidos
        if (registro == "00000000000000" || 
            registro == "11111111111111" || 
            registro == "22222222222222" || 
            registro == "33333333333333" || 
            registro == "44444444444444" || 
            registro == "55555555555555" || 
            registro == "66666666666666" || 
            registro == "77777777777777" || 
            registro == "88888888888888" || 
            registro == "99999999999999")
            throw new InvalidRegistroError;
            
        // Valida DVs
        let tamanho = registro.length - 2
        let numeros = registro.substring(0,tamanho);
        let digitos = registro.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(0)))
            throw new InvalidRegistroError;
            
        tamanho = tamanho + 1;
        numeros = registro.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(1)))
            throw new InvalidRegistroError;
            
        console.log("Registro " + registro + " validado");
        }
}
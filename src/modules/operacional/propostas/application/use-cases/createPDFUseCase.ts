import { EmpresaRepository } from "../../../empresa/infra/repositories/interfaceDB/EmpresaRepository";
import { GetPropostaDTO } from "../../dtos/GetPropostaDTO";
import { PropostaData, PropostaHTMLTemplate } from "../../infra/pdf/PropostaHTMLTemplate";
import { PropostaRepository } from "../../infra/repositories/interfaceDB/propostaRepository";
import { PDFGeneratorInterface } from "../interfaces/PDFGeneratorInterface";

export type PDFInputData = {
    propostaId: string,
    revisaoId: string
}

export class CreatePDFUseCase {
  constructor(
    private pdfGenerator: PDFGeneratorInterface,
    private propostaRepository: PropostaRepository, // Seu repositório existente
    private empresaRepository: EmpresaRepository
  ) {}

  async execute(data: PDFInputData, empresaId: string): Promise<any> {
    // Busca a proposta no banco
    const proposta : GetPropostaDTO = await this.propostaRepository.get(data.propostaId);
    
    if (!proposta) {
      throw new Error('Proposta não encontrada');
    }
    const empresa = await this.empresaRepository.get(empresaId)
    if (!empresa) {
        throw new Error("Empresa não encontrada");
    }

    const revisao = proposta.revisoes.find((r) => r.id === data.revisaoId);
    if (!revisao) {
        throw new Error("Revisão não encontrada");
    }

    // Transforma os dados no formato esperado pelo template
    const propostaData: PropostaData = {
      tituloProjeto: proposta.tituloProjeto,
      data: new Date(proposta.createdAt).toLocaleDateString('pt-BR'),
      clienteNome: proposta.cliente.nome,
      itens: revisao.itens.map((item: any) => ({
        nome: item.nome,
        quantidade: item.quantidade,
        preco: item.preco,
        unidadeDeMedida: item.unidadeDeMedida
      })),
      valorTotal: revisao.valorTotal,
      //observacoes: proposta.observacoes,
      empresa: {
        nome: empresa!.DadosGerais!.nome,
        cnpj: empresa!.DadosFiscais?.registro,
        endereco: proposta.endereco
      }
    };

    // console.log(propostaData)
    // Gera o HTML
    //const html = PropostaHTMLTemplate.generate(propostaData);

    // Gera o PDF
    const pdfBuffer = await this.pdfGenerator.generate(propostaData);

    return pdfBuffer;
  }
}
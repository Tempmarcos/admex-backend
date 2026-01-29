import { PropostaData } from "../../infra/pdf/PropostaHTMLTemplate";

export interface PDFGeneratorInterface {
  generate(data: PropostaData): Promise<Buffer>;
}
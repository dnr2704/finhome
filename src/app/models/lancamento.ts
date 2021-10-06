/* eslint-disable eol-last */
export interface Lancamento {
  id: number;
  descricao: string;
  data: Date;
  valor: number;
  idcat: number | null;
  idcon: number | null;
  idcar: number | null;
  pagador: string;
  parcelas: number;
  faturaatual: string;
  observacoes: string;
}

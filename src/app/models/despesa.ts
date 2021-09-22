export interface Despesa {
  id: number | null;
  codigo: string;
  descricao: string;
  datainicio: Date;
  datafim: Date;
  idloc: number | null;
}

export interface Despesa {
  id: number | null;
  codigo: string;
  descricao: string;
  datainicio: Date;
  datafim: Date;
  valor: number;
  idusu: number | null;
}

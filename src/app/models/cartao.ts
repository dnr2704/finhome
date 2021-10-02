export interface Cartao {
  id: number | null;
  codigo: string;
  descricao: string;
  limite: number;
  vencedia: number;
  fechadia: number;
  idusu: number | null;
}

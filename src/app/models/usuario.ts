export interface Usuario {
  id: number | null;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  imagem: string;
  datanascimento: Date;
  novasenha: string;
  admin: string;
}

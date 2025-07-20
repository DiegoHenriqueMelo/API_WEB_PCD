/**
 * Classe que representa um Contratante (empresa) no sistema,
 * contendo dados essenciais para identificação e autenticação.
 */
export class Contratante {
  public id: string = ""; // ID único do contratante, gerado dinamicamente
  public nome_fantasia: string; // Nome fantasia da empresa
  public razao_social: string; // Razão social da empresa
  public email: string; // Email do contratante
  public confirme_email: string; // Confirmação do email para validação
  public senha: string; // Senha de acesso
  public confirme_senha: string; // Confirmação da senha para validação
  public cnpj: string; // CNPJ da empresa (identificação fiscal)
  public telefone: string; // Telefone para contato
  public status: boolean = true; // Status ativo do contratante
  public acessibilidade: string; // Informações sobre acessibilidade

  /**
   * Inicializa uma nova instância da classe Contratante com os dados fornecidos.
   * @param name_fantasia - Nome fantasia da empresa
   * @param rasao_social - Razão social da empresa
   * @param email - Email do contratante
   * @param confirme_email - Confirmação do email
   * @param senha - Senha de acesso
   * @param confirme_senha - Confirmação da senha
   * @param cnpj - CNPJ da empresa
   * @param telefone - Telefone para contato
   * @param acessibilidade - Informações de acessibilidade da empresa
   */
  constructor(
    name_fantasia: string,
    rasao_social: string,
    email: string,
    confirme_email: string,
    senha: string,
    confirme_senha: string,
    cnpj: string,
    telefone: string,
    acessibilidade: string
  ) {
    this.nome_fantasia = name_fantasia;
    this.razao_social = rasao_social;
    this.email = email;
    this.confirme_email = confirme_email;
    this.senha = senha;
    this.confirme_senha = confirme_senha;
    this.cnpj = cnpj;
    this.telefone = telefone;
    this.acessibilidade = acessibilidade;
  }

  /**
   * Gera e atribui um ID único para o contratante,
   * com prefixo "EMP-" seguido de um número aleatório de 6 dígitos.
   */
  public async setId(): Promise<void> {
    let prefix = "EMP-";
    let suffix = Math.floor(Math.random() * 1000000);
    this.id = prefix + suffix;
  }
}

/**
 * Classe que representa um Colaborador da empresa,
 * contendo informações essenciais para identificação e autenticação.
 */
export class Colaborador {
  public id: string;
  public name: string;
  public email: string;
  public senha: string;
  public setor: string;

  /**
   * Inicializa uma nova instância da classe Colaborador com os dados fornecidos.
   * @param name - Nome completo do colaborador
   * @param email - Email do colaborador
   * @param senha - Senha de acesso
   * @param setor - Setor em que o colaborador atua
   */
  constructor(name: string, email: string, senha: string, setor: string) {
    this.id = ""; // O ID será gerado posteriormente
    this.name = name;
    this.email = email;
    this.senha = senha;
    this.setor = setor;
  }

  /**
   * Gera e atribui um ID único para o colaborador,
   * com prefixo "COLAB-" seguido de um número aleatório de 6 dígitos.
   */
  public async setId(): Promise<void> {
    let prefix = "COLAB-";
    let suffix = Math.floor(Math.random() * 1000000);
    this.id = prefix + suffix;
  }
}

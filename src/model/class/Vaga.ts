/**
 * Classe que representa uma vaga de emprego no sistema.
 */
export class Vaga {
  public id: string;              // Identificador único da vaga
  public data_inicio: Date;       // Data de início da vaga (criação)
  public data_fim: Date;          // Data final da vaga (validade)
  public status: boolean;         // Status ativo/inativo da vaga
  public titulo: string;          // Título da vaga
  public descricao: string;       // Descrição detalhada da vaga
  public salario: number;         // Salário oferecido para a vaga
  public localidade: string;      // Localidade onde a vaga está disponível
  public acessibilidade: string;  // Informações sobre acessibilidade na vaga

  /**
   * Construtor para inicializar uma nova vaga com os dados básicos.
   * @param data_fim - Data final (validade) da vaga
   * @param titulo - Título da vaga
   * @param descricao - Descrição detalhada da vaga
   * @param salario - Salário oferecido
   * @param localidade - Localidade da vaga
   * @param acessibilidade - Detalhes de acessibilidade da vaga
   */
  constructor(
    data_fim: Date,
    titulo: string,
    descricao: string,
    salario: number,
    localidade: string,
    acessibilidade: string
  ) {
    this.id = "";                     // Inicialmente vazio, será definido via setId()
    this.data_inicio = new Date();    // Define data de criação da vaga como momento atual
    this.data_fim = data_fim;
    this.status = true;               // Vaga começa ativa por padrão
    this.titulo = titulo;
    this.descricao = descricao;
    this.salario = salario;
    this.localidade = localidade;
    this.acessibilidade = acessibilidade;
  }

  /**
   * Define o ID da vaga com prefixo fixo "VAGA-" seguido de número aleatório.
   * @param id - Parâmetro não utilizado, poderia ser removido para evitar confusão
   */
  public setId(id: string) {
    let prefix = "VAGA-";
    let sufix = Math.floor(Math.random() * 1000000);
    this.id = prefix + sufix;
  }
}

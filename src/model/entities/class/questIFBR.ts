/**
 * Classe que representa uma questão do IFBR (provavelmente um questionário ou avaliação).
 */
export class QuestIFBR {
  public id: number;      // Identificador único da questão
  public name: string;    // Nome ou descrição da questão
  public score: number;   // Pontuação atribuída para a questão

  /**
   * Construtor para criar uma nova instância de QuestIFBR.
   * @param id - Identificador numérico da questão
   * @param name - Nome ou descrição da questão
   * @param score - Pontuação associada à questão
   */
  constructor(id: number, name: string, score: number) {
    this.id = id;
    this.name = name;
    this.score = score;
  }

  /**
   * Retorna uma representação em string da questão,
   * útil para logs ou exibição simples.
   */
  toString() {
    return `Quest ${this.id} - ${this.name} - ${this.score} points`;
  }
}

import { QuestIFBR } from "./questIFBR";

/**
 * Classe que representa uma entrada de IFBR (provavelmente um questionário ou avaliação),
 * contendo informações de identificação, nome, pontuação e data associada.
 */
export class IFBR {
  public idTable: string; // ID único na tabela, gerado dinamicamente
  public id: number;      // ID da questão ou entrada
  public name: string;    // Nome ou título da questão/entrada
  public score: number;   // Pontuação atribuída
  public date: Date;      // Data da avaliação ou registro

  /**
   * Inicializa uma nova instância da classe IFBR com os dados fornecidos.
   * @param id - Identificador numérico da entrada
   * @param name - Nome ou título da entrada
   * @param date - Data da avaliação/registro
   * @param score - Pontuação atribuída
   */
  constructor(id: number, name: string, date: Date, score: number) {
    this.idTable = "";  // Inicializado vazio, deve ser definido posteriormente
    this.id = id;
    this.name = name;
    this.date = date;
    this.score = score;
  }
}

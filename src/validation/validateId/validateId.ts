import * as Db from "../../repositories/queryTools.js";

/**
 * Valida a existência do ID na tabela tb_candidato.
 * @param id - ID a ser validado
 * @returns void (apenas imprime o resultado no console)
 */
export let validateId = async (id: string) => {
  console.log("🚀 Iniciando validação de ID em tb_candidato");
  let validId = await Db.selectId("tb_candidato", id);
  console.log("✔️ Resultado da validação:", validId);
};

/**
 * Valida se o ID pertence a um Contratante (EMP) ou Colaborador (COLAB).
 * @param id - ID a ser validado
 * @returns true se válido, false caso contrário
 */
export let validateIdContratante = async (id: string): Promise<boolean> => {
  console.log(`🚀 Validando se ID é Contratante ou Colaborador: ${id}`);
  let arr: string[] = id.toUpperCase().split("-");
  let isValid: boolean;
  arr[0] === "EMP" || arr[0] === "COLAB" ? (isValid = true) : (isValid = false);
  console.log(`✔️ Resultado da validação: ${isValid}`);
  return isValid;
};

/**
 * Valida se o ID pertence a um Candidato (CAND).
 * @param id - ID a ser validado
 * @returns true se válido, false caso contrário
 */
export let validateIdCandidato = async (id: string): Promise<boolean> => {
  console.log(`🚀 Validando se ID é Candidato: ${id}`);
  let arr: string[] = id.toUpperCase().split("-");
  let isValid = arr[0] === "CAND";
  console.log(`✔️ Resultado da validação: ${isValid}`);
  return isValid;
};

export let validateIdByRelation = async (
  value: string,
  data: string,
  table: string
): Promise<boolean> => {
  console.log(`🚀 Validando se ID é existente: ${value}`);
  let result = await Db.validateData(value, table, data);
  if (result > 0) {
    return true;
  } else {
    return false;
  }
};

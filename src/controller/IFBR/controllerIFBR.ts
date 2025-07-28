import * as IFBR from "../../model/IFBR/modelIFBR.js";

/**
 * Controller para criar um formulário IFBR completo.
 * Encaminha os dados e ID para o model que executa a inserção.
 * @param ID - Identificador relacionado ao formulário (ex: candidato)
 * @param body - Array de objetos com dados do formulário (id, nome e pontuação)
 * @returns resultado da operação (sucesso ou erro)
 */
export let controllerIFBR = async (
  ID: string,
  body: [{ id: number; name: string; score: number }]
): Promise<any> => {
  console.log("🚀 Passando ao controllerIFBR()");
  let result = IFBR.createIFBRCompleto(body, ID);
  console.log("✔️ Resultado da criação IFBR retornado");
  return result;
};

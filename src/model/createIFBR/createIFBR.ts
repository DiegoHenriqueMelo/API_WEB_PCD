import { IFBR } from "../entities/class/ifbr.js";
import * as DB from "../../repositories/queryTools.js";

/**
 * Função assíncrona para criar um conjunto completo de registros IFBR associados a um candidato.
 * Recebe um array de objetos contendo as perguntas/respostas do IFBR e o ID do candidato.
 * 
 * @param body - Array contendo objetos com id, nome e score das questões IFBR.
 * @param id_user - Identificador único do candidato no sistema.
 * @returns Retorna boolean true em caso de sucesso, ou false em caso de erro.
 */
export let createIFBRCompleto = async (
  body: [{ id: number; name: string; score: number }],
  id_user: string
): Promise<any> => {
  const logPrefix = `[createIFBRCompleto][UserID: ${id_user}]`;

  try {
    console.info(`${logPrefix} - Iniciando processamento do IFBR completo`);

    // Função para gerar ID único para o conjunto IFBR
    const setId = (): string => {
      const prefix = "IFBR-";
      const suffix = Math.floor(Math.random() * 1_000_000);
      return prefix + suffix.toString().padStart(6, "0");
    };

    const idIFBR = setId();
    console.debug(`${logPrefix} - Gerado ID único para IFBR: ${idIFBR}`);

    const questIFBR: IFBR[] = [];

    // Construção e validação dos dados IFBR
    body.forEach((element) => {
      if (element.id >= 1 && element.id < 8) {
        const tupla = new IFBR(element.id, element.name, new Date(), element.score);
        questIFBR.push(tupla);
        console.debug(
          `${logPrefix} - Questão adicionada: id=${element.id}, name="${element.name}", score=${element.score}`
        );
      } else {
        console.warn(`${logPrefix} - Questão ignorada por ID inválido: ${element.id}`);
      }
    });

    // Persistência no banco - iterar com await para garantir ordem e capturar erros
    for (const quest of questIFBR) {
      await DB.insertIntoIFBR(quest.id, quest.name, quest.date, quest.score, idIFBR);
      console.debug(`${logPrefix} - Inserido IFBR: "${quest.name}" (ID: ${quest.id})`);
    }

    await DB.updateIfbrCandidato(id_user, idIFBR);
    console.info(`${logPrefix} - Atualizado candidato com IFBR ID: ${idIFBR}`);

    await DB.insertCandidatoIFBRData();
    console.info(`${logPrefix} - Dados complementares IFBR inseridos com sucesso`);

    console.info(`${logPrefix} - Processamento concluído com sucesso`);
    return true;
  } catch (error) {
    console.error(`${logPrefix} - ERRO crítico ao processar IFBR completo:`, error);
    return false;
  }
};

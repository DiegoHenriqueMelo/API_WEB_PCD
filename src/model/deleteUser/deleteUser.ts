import * as DB from "../../repository/insertDB/queryTools.js";

export let deleteUser = async (table: string, id: number) => {
  const logPrefix = `[deleteUser][Table: ${table}][ID: ${id}]`;

  try {
    console.info(`${logPrefix} - Iniciando exclusão do registro`);

    const result = await DB.deleteFromTable(table, id);

    console.debug(`${logPrefix} - Resultado da query: rowCount=${result.rowCount}`);

    if (result.rowCount > 0) {
      console.info(`${logPrefix} - Exclusão realizada com sucesso`);
      return result;
    } else {
      console.warn(`${logPrefix} - Nenhum registro encontrado para exclusão`);
      return false;
    }
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao executar deleteUser:`, error);
    throw error;  // propaga o erro para o nível superior tratar apropriadamente
  }
};

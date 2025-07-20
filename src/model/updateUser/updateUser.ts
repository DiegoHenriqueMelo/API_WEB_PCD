import * as DB from "../../repository/insertDB/queryTools.js"
import { validateCpf } from "../validateData/validadeteCpf.js";
import { validateAge } from "../validateData/validateAge.js";

export let updateUser = async (table: string, id: number, body: object) => {
  const logPrefix = `[updateUser][Table: ${table}][ID: ${id}]`;
  console.log(`${logPrefix} - Iniciando atualização do usuário`);

  try {
    // Monta os pares coluna = $i para o comando SQL
    const keys = Object.keys(body);
    const values = Object.values(body);
    console.log(`${logPrefix} - Campos a atualizar: ${keys.join(", ")}`);

    const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    // Validações específicas antes do update
    if (keys.includes("cpf")) {
      const index = keys.indexOf("cpf");
      const cpfIsValid: boolean = validateCpf(values[index]);
      console.log(`${logPrefix} - Validando CPF: ${values[index]} => ${cpfIsValid}`);
      if (!cpfIsValid) {
        console.error(`${logPrefix} - ERRO: CPF inválido`);
        throw new Error("CPF inválido");
      }
    }

    if (keys.includes("data_nascimento")) {
      const index = keys.indexOf("data_nascimento");
      const dateIsValid: boolean = validateAge(new Date(values[index]));
      console.log(`${logPrefix} - Validando data_nascimento: ${values[index]} => ${dateIsValid}`);
      if (!dateIsValid) {
        console.error(`${logPrefix} - ERRO: Data de nascimento inválida`);
        throw new Error("Data de nascimento inválida");
      }
    }

    // Executa update no banco
    const result = await DB.updateUserColumn(table, id, sets, values);
    console.log(`${logPrefix} - Atualização concluída com sucesso. Linhas afetadas: ${result.rowCount}`);

    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.error(`${logPrefix} - ERRO na atualização:`, error.message);
    } else {
      console.error(`${logPrefix} - ERRO na atualização:`, error);
    }
    throw error;
  }
};

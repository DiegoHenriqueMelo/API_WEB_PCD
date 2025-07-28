import { Colaborador } from "../entities/class/colaborador.js";
import { validateId, validateIdByRelation } from "../../validation/validateId/validateId.js";
import * as DB from "../../repositories/queryTools.js";
import { validateCpf, validateCpfToDB } from "../../validation/validateData/validadeteCpf.js";
import { Candidate } from "../entities/class/candidate.js";
import { Contratante } from "../entities/class/contratante.js";
import { validateAge } from "../../validation/validateData/validateAge.js";
import { validateCNPJ, validateCNPJToDB } from "../../validation/validateData/validateCNPJ.js";
import { validateEmailToDB } from "../../validation/validateData/validateEmail.js";

/**
 * Cria um colaborador e associa-o a uma empresa.
 * - Valida a existência da empresa.
 * - Gera um ID único para o colaborador.
 * - Insere no banco e associa com a empresa.
 * 
 * @param user Dados do colaborador (nome, email, senha e setor).
 * @param id_empresa ID da empresa à qual o colaborador será vinculado.
 * @returns true em caso de sucesso, ou lança erro em caso de falha.
 */
export let createColaborador = async (
  user: { name: string; email: string; senha: string; setor: string; },
  id_empresa: string
) => {
  console.log("🚀 Validando id da empresa");

  // Valida se a empresa existe
  let result = await validateIdByRelation(id_empresa, "tb_empresa", "id");
  if (result === false) {
    throw new Error(`Empresa ${id_empresa} nao encontrada`);
  }

  console.log("Iniciando criação do colaborador pela classe Colaborador");
  let colaborador = new Colaborador(user.name, user.email, user.senha, user.setor);

  try {
    console.log("Definindo ID único para colaborador");
    colaborador.setId();

    // Garante que o ID não seja vazio
    while (colaborador.id == "") {
      console.log("ID vazio detectado, gerando novo ID");
      await colaborador.setId();
    }

    // Inserção no banco de dados
    console.log(`Inserindo colaborador com ID: ${colaborador.id} no banco de dados`);
    await DB.insertIntoColaborador(colaborador.id, colaborador.name, colaborador.email, colaborador.senha, colaborador.setor);

    // Associa colaborador à empresa
    console.log(`Associando colaborador ID: ${colaborador.id} à empresa ID: ${id_empresa}`);
    await DB.updateColaboradorEmpresa(colaborador.id, id_empresa);
    await DB.insertEmpresaColaborador(colaborador.id, id_empresa);

    console.log("✅ Colaborador criado e associado com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao criar colaborador:", error);
    return false;
  }
};

/**
 * Cria um novo candidato.
 * - Valida CPF, e-mail, data de nascimento e senhas.
 * - Gera um ID único.
 * - Insere no banco de dados.
 * 
 * @param user Objeto contendo os dados do candidato.
 * @returns true se sucesso, array com erros de validação ou lança erro em caso de falha.
 */
export let createCanditado = async (user: {
  name: string; email: string; confirme_email: string; senha: string; confirme_senha: string;
  telefone: string; cpf: string; data_nascimento: Date; def_visual: boolean; def_fisica: boolean;
  def_auditiva: boolean; def_intelectual: boolean; outra_def: boolean; descricao_def: string;
  acessibilidade_trab: boolean; descricao_acessibilidade: string;
}): Promise<any> => {
  try {
    console.log("🚀 Iniciando createCanditado - criando instância da classe Candidate");
    let errorLog = [];

    // Criação do candidato
    let newUser = new Candidate(
      user.name, user.email, user.confirme_email, user.senha, user.confirme_senha, user.telefone,
      user.cpf, user.data_nascimento, user.def_visual, user.def_auditiva, user.def_fisica,
      user.def_intelectual, user.outra_def, user.descricao_def, user.acessibilidade_trab,
      user.descricao_acessibilidade
    );

    // Gera ID único
    newUser.setId();
    console.log("✔️ ID inicial criado:", newUser.id);

    // Validações
    let idIsValid: any = validateId(newUser.id);
    let cpfIsValid: boolean = validateCpf(newUser.cpf);
    if (cpfIsValid === true) {
      console.log("validando cpf no banco");
      cpfIsValid = await validateCpfToDB(newUser.cpf, "cpf", "tb_candidato");
      console.log("✔️ cpfIsValid:", cpfIsValid);
      if (!cpfIsValid) {
        console.log("❌ CPF inválido:", newUser.cpf);
        errorLog.push("CPF inválido");
      }
    }

    let dateIsValid: boolean = validateAge(newUser.data_nascimento);
    let emailIsValid: boolean = newUser.email === newUser.confirme_email;
    if (emailIsValid === true) {
      console.log("validando email no banco");
      emailIsValid = await validateEmailToDB(newUser.email, "email", "tb_candidato");
      console.log("✔️ emailIsValid:", emailIsValid);
      if (!emailIsValid) {
        console.log("❌ Email inválido:", newUser.email);
        errorLog.push("Email inválido");
      }
    }

    let passwordIsValid: boolean = newUser.senha === newUser.confirme_senha;

    // Regenera ID se inválido
    while (idIsValid == "") {
      newUser.setId();
      idIsValid = validateId(newUser.id);
      console.log("🔄 Gerando novo ID, tentando validar:", newUser.id);
    }
    console.log("✔️ ID validado:", newUser.id);

    // Verifica erros acumulados
    !cpfIsValid && errorLog.push("CPF inválido");
    !dateIsValid && errorLog.push("Data de nascimento inválida");
    !emailIsValid && errorLog.push("Emails não coincidem ou inválidos");
    !passwordIsValid && errorLog.push("Senhas não coincidem ou inválidas");

    // Retorna erros se houver
    if (errorLog.length > 0) {
      console.warn("❌ Dados inválidos encontrados:", errorLog);
      return errorLog;
    } else {
      console.log("✔️ Todos dados validados com sucesso, inserindo no banco");
      DB.insertIntoCandidate(newUser);
      return true;
    }
  } catch (error) {
    console.error("❌ Erro capturado em createCanditado:", error);
    return error;
  }
};

/**
 * Cria um contratante.
 * - Valida e-mail, CNPJ e senhas.
 * - Gera ID único.
 * - Insere no banco de dados.
 * 
 * @param user Objeto contendo os dados do contratante.
 * @returns string de sucesso, array de erros ou lança erro em caso de falha.
 */
export let createContratante = async (user: {
  nome_fantasia: string; razao_social: string; email: string; confirme_email: string;
  senha: string; confirme_senha: string; cnpj: string; telefone: string; acessibilidade: string;
}): Promise<any> => {
  try {
    let errorLog = [];

    console.log("🚀 Iniciando createContratante - criando instância da classe Contratante");
    let newContratante = new Contratante(
      user.nome_fantasia, user.razao_social, user.email, user.confirme_email,
      user.senha, user.confirme_senha, user.cnpj, user.telefone, user.acessibilidade
    );

    // Gera ID único
    newContratante.setId();
    console.log("✔️ ID inicial criado:", newContratante.id);
    while (newContratante.id == "") {
      newContratante.setId();
      console.log("🔄 Gerando novo ID para contratante:", newContratante.id);
    }
    console.log("✔️ ID validado para contratante:", newContratante.id);

    // Valida e-mail
    let emailIsValid: boolean = newContratante.email === newContratante.confirme_email;
    if (emailIsValid === true) {
      emailIsValid = await validateEmailToDB(newContratante.email, "email", "tb_contratante");
      if (!emailIsValid) {
        console.log("❌ Email inválido:", newContratante.email);
        errorLog.push("Email inválido");
      } else {
        console.log("✔️ Email validado:", newContratante.email);
      }
    }

    // Valida senha
    let passwordIsValid: boolean = newContratante.senha === newContratante.confirme_senha;

    // Valida CNPJ
    let cnpjIsValid: boolean = validateCNPJ(newContratante.cnpj);
    if (cnpjIsValid === true) {
      cnpjIsValid = await validateCNPJToDB(newContratante.cnpj, "cnpj", "tb_empresa");
      if (!cnpjIsValid) {
        console.log("❌ CNPJ inválido:", newContratante.cnpj);
        errorLog.push("CNPJ inválido");
      } else {
        console.log("✔️ CNPJ validado:", newContratante.cnpj);
      }
    }

    // Acumula erros
    !cnpjIsValid && errorLog.push("CNPJ inválido");
    !emailIsValid && errorLog.push("Emails não coincidem ou inválidos");
    !passwordIsValid && errorLog.push("Senhas não coincidem ou inválidas");

    // Retorna erros
    if (errorLog.length > 0) {
      console.warn("❌ Dados inválidos encontrados no contratante:", errorLog);
      return errorLog;
    } else {
      console.log("✔️ Dados do contratante validados com sucesso, inserindo no banco");
      DB.insertIntoContratante(newContratante);
      return "Sucesso ao criar contratante";
    }
  } catch (error) {
    console.error("❌ Erro capturado em createContratante:", error);
    return error;
  }
};

/**
 * Exclui um usuário pelo ID e tabela.
 */
export let deleteUser = async (table: string, id: string) => {
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
    throw error;
  }
};

/**
 * Busca todos os registros de uma tabela.
 */
export let getUser = async (table: string): Promise<any> => {
  const logPrefix = `[getUser][Table: ${table}]`;
  try {
    console.info(`${logPrefix} - Iniciando consulta de todos os registros`);
    let result = await DB.selectFromTable(table);
    console.info(`${logPrefix} - Consulta finalizada com sucesso, registros encontrados: ${result.rows.length}`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar dados:`, error);
    throw error;
  }
};

/**
 * Busca um registro por ID.
 */
export let getUserByID = async (table: string, id: string): Promise<any> => {
  const logPrefix = `[getUserByID][Table: ${table}][ID: ${id}]`;
  try {
    console.info(`${logPrefix} - Iniciando consulta por ID`);
    let result = await DB.selectFromIdWhere(table, id);
    console.info(`${logPrefix} - Consulta finalizada, registros encontrados: ${result.rows.length}`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar dados por ID:`, error);
    throw error;
  }
};

/**
 * Busca um colaborador específico.
 */
export let getColaborador = async (table: string, id: string): Promise<any> => {
  const logPrefix = `[getColaborador][Table: ${table}][ID: ${id}]`;
  try {
    console.info(`${logPrefix} - Iniciando consulta do colaborador`);
    let result = await DB.selectFromIdWhere(table, id);
    console.info(`${logPrefix} - Consulta finalizada, registros encontrados: ${result.rows.length}`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar colaborador:`, error);
    throw error;
  }
};

/**
 * Atualiza dados de um usuário.
 */
export let updateUser = async (table: string, id: string, body: object) => {
  const logPrefix = `[updateUser][Table: ${table}][ID: ${id}]`;
  console.log(`${logPrefix} - Iniciando atualização do usuário`);

  try {
    // Monta os pares chave = valor para o UPDATE
    const keys = Object.keys(body);
    const values = Object.values(body);
    console.log(`${logPrefix} - Campos a atualizar: ${keys.join(", ")}`);

    const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    // Valida CPF se presente
    if (keys.includes("cpf")) {
      const index = keys.indexOf("cpf");
      const cpfIsValid: boolean = validateCpf(values[index]);
      console.log(`${logPrefix} - Validando CPF: ${values[index]} => ${cpfIsValid}`);
      if (!cpfIsValid) {
        console.error(`${logPrefix} - ERRO: CPF inválido`);
        throw new Error("CPF inválido");
      }
    }

    // Valida data de nascimento se presente
    if (keys.includes("data_nascimento")) {
      const index = keys.indexOf("data_nascimento");
      const dateIsValid: boolean = validateAge(new Date(values[index]));
      console.log(`${logPrefix} - Validando data_nascimento: ${values[index]} => ${dateIsValid}`);
      if (!dateIsValid) {
        console.error(`${logPrefix} - ERRO: Data de nascimento inválida`);
        throw new Error("Data de nascimento inválida");
      }
    }

    // Executa atualização
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

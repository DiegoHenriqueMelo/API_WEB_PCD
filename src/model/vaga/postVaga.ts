import { Vaga } from "../class/Vaga.js";
import { validateDate } from "../validateData/validateDataVaga.js";
import * as DB from "../../repository/insertDB/queryTools.js";

/**
 * Cria uma nova vaga vinculada a uma empresa ou colaborador.
 * Realiza validação da data de término e gera um ID único para a vaga.
 * Insere a vaga nas tabelas relacionadas do banco de dados.
 * 
 * @param vaga Dados da vaga a ser criada
 * @param id_empresa ID da empresa ou colaborador responsável pela vaga
 * @returns Promise<boolean> Retorna true se sucesso, false em caso de erro
 */
export let createVaga = async (
  vaga: {
    data_fim: Date;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    acessibilidade: string;
  },
  id_empresa: string
): Promise<boolean> => {
  const logPrefix = `[createVaga][Empresa: ${id_empresa}]`;
  console.log(`${logPrefix} - Iniciando processo de criação da vaga`);

  try {
    // Instancia um novo objeto Vaga com os dados recebidos
    let newVaga = new Vaga(
      new Date(vaga.data_fim),
      vaga.titulo,
      vaga.descricao,
      vaga.salario,
      vaga.localidade,
      vaga.acessibilidade
    );

    // Geração do ID da vaga, com retry para garantir não ser vazio
    newVaga.setId(id_empresa);
    while (newVaga.id === "") {
      newVaga.setId(id_empresa);
    }
    console.log(`${logPrefix} - ID gerado para vaga: ${newVaga.id}`);

    // Validação da data de término da vaga
    if (!validateDate(newVaga.data_fim)) {
      console.error(`${logPrefix} - Falha na validação: Data fim inválida: ${newVaga.data_fim}`);
      throw new Error("Data de fim inválida");
    }
    console.log(`${logPrefix} - Data fim validada: ${newVaga.data_fim.toISOString()}`);

    // Insere a vaga na tabela principal
    await DB.insertVaga(
      newVaga.id,
      newVaga.data_inicio,
      newVaga.data_fim,
      newVaga.status,
      newVaga.titulo,
      newVaga.descricao,
      newVaga.salario,
      newVaga.localidade,
      newVaga.acessibilidade,
      id_empresa
    );
    console.log(`${logPrefix} - Vaga inserida com sucesso na tabela principal`);

    // Verifica se o id_empresa refere-se a um colaborador para obter a empresa mãe
    if (id_empresa.toUpperCase().startsWith("COLAB")) {
      console.log(`${logPrefix} - ID pertence a colaborador, buscando empresa associada`);
      let empresaId = await DB.getEmpByColab(id_empresa);
      console.log(`${logPrefix} - Empresa associada encontrada: ${empresaId}`);

      await DB.insertEmpVaga(newVaga, empresaId);
      console.log(`${logPrefix} - Relação vaga-empresa registrada para empresa ${empresaId}`);
    } else {
      // Caso seja ID direto da empresa, insere diretamente
      await DB.insertEmpVaga(newVaga, id_empresa);
      console.log(`${logPrefix} - Relação vaga-empresa registrada para empresa ${id_empresa}`);
    }

    console.log(`${logPrefix} - Processo de criação da vaga concluído com sucesso`);
    return true;

  } catch (error) {
    console.error(`${logPrefix} - ERRO crítico ao criar vaga:`, error);
    return false;
  }
};

/**
 * Realiza a inscrição de um candidato em uma vaga específica.
 * 
 * @param id_candidate ID do candidato que deseja se inscrever
 * @param id_vaga ID da vaga na qual o candidato se inscreverá
 * @returns Promise<any> Resultado da inserção no banco
 */
export let registerCandidateToVaga = async (
  id_candidate: string,
  id_vaga: string
): Promise<any> => {
  const logPrefix = `[registerCandidateToVaga][Candidate: ${id_candidate}][Vaga: ${id_vaga}]`;
  console.log(`${logPrefix} - Iniciando inscrição do candidato na vaga`);

  try {
    let result = await DB.insertCandidateVaga(id_candidate, id_vaga);
    console.log(`${logPrefix} - Inscrição do candidato concluída com sucesso`);
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO na inscrição do candidato:`, error);
    throw error;
  }
};

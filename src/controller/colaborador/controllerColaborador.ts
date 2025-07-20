import { get } from "http";
import { createColaborador } from "../../model/colaborador/createColaborador.js";
import * as getUser from "../../model/getUser/getUser.js";
import { createVaga } from "../../model/vaga/postVaga.js";

/**
 * Controller para criação de um novo colaborador.
 * Recebe dados do colaborador e o ID da empresa para associação.
 * @param user - Dados do colaborador a ser criado
 * @param id_empresa - ID da empresa associada ao colaborador
 * @returns resposta da criação (sucesso ou erro)
 */
export let controllerColaborador = async (
  user: {
    name: string;
    email: string;
    senha: string;
    setor: string;
  },
  id_empresa: string
) => {
  console.log("🚀 Passando ao createColaborador()");
  let response = createColaborador(user, id_empresa);
  console.log("✔️ Resposta da criação do colaborador recebida");
  return response;
};

/**
 * Controller para obter colaboradores de uma tabela associada a um ID.
 * @param table - Nome da tabela para consulta (ex: "tb_empresa")
 * @param id - ID associado para filtro
 * @returns lista de colaboradores encontrados
 */
export let controllerGetColaborador = async (table: string, id: number) => {
  console.log("🚀 Passando ao getColaborador()");
  let response = await getUser.getColaborador(table, id);
  console.log(`✔️ Colaboradores encontrados: ${response.length || response.rows?.length || 0}`);
  return response;
};

/**
 * Controller para criação de uma vaga associada a uma empresa.
 * @param vaga - Dados da vaga a ser criada
 * @param id_empresa - ID da empresa que cria a vaga
 * @returns resultado da criação da vaga (sucesso ou erro)
 */
export let postVaga = async (
  vaga: {
    data_fim: Date;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    acessibilidade: string;
  },
  id_empresa: string
) => {
  console.log("🚀 Passando ao createVaga()");
  let result = createVaga(vaga, id_empresa);
  console.log("✔️ Resposta da criação da vaga recebida");
  return result;
};

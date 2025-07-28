import * as Model from "../../model/user/modelUser.js";


/**
 * Controller responsável por criar um novo contratante.
 * Chama a função createContratante para validação e inserção no banco.
 * @param user - Dados do contratante a ser criado
 * @returns resposta do createContratante (sucesso, erros ou exceção)
 */
export let controllerContratante = (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
}) => {
  console.log("🚀 Passando ao createContratante()");
  let response = Model.createContratante(user);
  return response;
};

/**
 * Controller para buscar todos os contratantes no banco.
 * @returns lista de contratantes encontrados
 */
export let controllerGetContratante = async () => {
  console.log("🚀 Passando ao controllerGetContratante()");
  let result = await Model.getUser("contratante");
  console.log(`✔️ Contratantes encontrados: ${result.rows.length}`);
  return result.rows;
};

/**
 * Controller para buscar um contratante pelo seu ID.
 * @param id - ID do contratante
 * @returns objeto contratante ou mensagem de não encontrado
 */
export let controllerGetContratanteById = async (id: string) => {
  console.log("🚀 Passando ao controllerGetContratanteById()");
  let result = await Model.getUserByID("tb_empresa", id);

  if (result.rows.length > 0) {
    console.log(`✔️ Contratante com ID ${id} encontrado`);
    return result.rows[0];
  } else {
    console.warn(`❌ Contratante com ID ${id} não encontrado`);
    return { message: "Contratante não encontrado." };
  }
};

/**
 * Controller para deletar um contratante pelo seu ID.
 * @param id - ID do contratante a ser deletado
 * @returns true se deletado, false caso contrário
 */
export let controllerDeleteContratante = async (id: string) => {
  console.log("🚀 Passando ao controllerDeleteContratante()");
  let result = await Model.deleteUser("tb_empresa", id);

  if (result) {
    console.log(`✔️ Contratante com ID ${id} deletado com sucesso`);
    return true;
  } else {
    console.warn(`❌ Falha ao deletar contratante com ID ${id}`);
    return false;
  }
};

/**
 * Controller para atualizar os dados de um contratante.
 * @param id - ID do contratante
 * @param body - Objeto com os dados a serem atualizados
 * @returns resultado da atualização ou false em caso de falha
 */
export let controllerUpdateContratante = async (id: string, body: object) => {
  console.log("🚀 Passando ao controllerUpdateContratante()");
  let result = await Model.updateUser("tb_empresa", id, body);

  if (result) {
    console.log(`✔️ Contratante com ID ${id} atualizado com sucesso`);
    return result;
  } else {
    console.warn(`❌ Falha ao atualizar contratante com ID ${id}`);
    return false;
  }
};

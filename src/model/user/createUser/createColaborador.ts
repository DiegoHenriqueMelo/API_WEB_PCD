import { Colaborador } from "../../entities/class/colaborador.js";
import {validateIdByRelation} from "../../../validation/validateId/validateId.js";
import * as DB from "../../../repositories/queryTools.js";

/**
 * Função para criar um colaborador e associá-lo a uma empresa no banco.
 * @param user - Dados do colaborador (nome, email, senha e setor)
 * @param id_empresa - ID da empresa à qual o colaborador será vinculado
 * @returns true em caso de sucesso, false em caso de erro
 */
export let createColaborador = async (
  user: {
    name: string;
    email: string;
    senha: string;
    setor: string;
  },
  id_empresa: string
) => {
  console.log("🚀 Validando id da empresa");
  let result = await validateIdByRelation(id_empresa, "tb_empresa", "id");
  if(result === false){
    throw new Error(`Empresa ${id_empresa} nao encontrada`);
  }
  console.log("Iniciando criação do colaborador pela classe Colaborador");
  
  let colaborador = new Colaborador(
    user.name,
    user.email,
    user.senha,
    user.setor
  );

  try {
    console.log("Definindo ID único para colaborador");
    colaborador.setId();
    
    // Garante que o ID não esteja vazio
    while (colaborador.id == "") {
      console.log("ID vazio detectado, gerando novo ID");
      await colaborador.setId();
    }
    
    console.log(`Inserindo colaborador com ID: ${colaborador.id} no banco de dados`);
    await DB.insertIntoColaborador(
      colaborador.id,
      colaborador.name,
      colaborador.email,
      colaborador.senha,
      colaborador.setor
    );
    
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

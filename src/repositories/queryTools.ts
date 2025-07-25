import * as DB from "../config/connect.js";

/**
 * Insere um novo candidato na tabela tb_candidato.
 * @param user - Objeto com todos os dados do candidato.
 */
export let insertIntoCandidate = async (user: {
  id: string;
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_visual: boolean;
  def_auditiva: boolean;
  def_fisica: boolean;
  def_intelectual: boolean;
  outra_def: boolean;
  descricao_def: string;
  acessibilidade_trab: boolean;
  descricao_acessibilidade: string;
  status: boolean;
}) => {
  try {
    console.log(`[insertIntoCandidate] Iniciando inserção do candidato ID: ${user.id}`);

    await DB.pool.query(
      `INSERT INTO tb_candidato (
        id, nome, email, senha, telefone, cpf, data_nascimento,
        def_visual, def_auditiva, def_fisica, def_intelectual, outra_def,
        desc_def, acess_trab, desc_acess, status_usuario
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15, $16
      )`,
      [
        user.id,
        user.name,
        user.email,
        user.senha,
        user.telefone,
        user.cpf,
        user.data_nascimento,
        user.def_visual,
        user.def_auditiva,
        user.def_fisica,
        user.def_intelectual,
        user.outra_def,
        user.descricao_def,
        user.acessibilidade_trab,
        user.descricao_acessibilidade,
        user.status,
      ]
    );

    console.log(`[insertIntoCandidate] Candidato ${user.id} inserido com sucesso!`);
  } catch (error) {
    console.error(`[insertIntoCandidate] ERRO ao inserir candidato ${user.id}:`, error);
    throw error; // Propaga erro para tratamento superior
  }
};

/**
 * Insere um novo contratante na tabela tb_empresa.
 * @param user - Objeto com dados do contratante.
 */
export let insertIntoContratante = async (user: {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
  status: boolean;
}) => {
  try {
    console.log(`[insertIntoContratante] Iniciando inserção do contratante ID: ${user.id}`);

    await DB.pool.query(
      `INSERT INTO tb_empresa (
        id, nome_fantasia, razao_social, email, senha, cnpj, telefone, status_empresa, acessibilidade
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )`,
      [
        user.id,
        user.nome_fantasia,
        user.razao_social,
        user.email,
        user.senha,
        user.cnpj,
        user.telefone,
        user.status,
        user.acessibilidade,
      ]
    );

    console.log(`[insertIntoContratante] Contratante ${user.id} inserido com sucesso!`);
  } catch (error) {
    console.error(`[insertIntoContratante] ERRO ao inserir contratante ${user.id}:`, error);
    throw error;
  }
};

/**
 * Busca o ID de um usuário na tabela dado o CPF ou CNPJ.
 * @param table Nome da tabela para consulta.
 * @param cpfOrCnpj CPF ou CNPJ para busca.
 * @returns Resultado da query.
 */

/**
 * Verifica se um determinado ID existe na tabela.
 * @param table Nome da tabela.
 * @param id ID a ser validado.
 * @returns Booleano indicando existência.
 */
export const selectId = async (table: string, id: string): Promise<boolean> => {
  try {
    console.log(`[selectId] Validando existência do ID ${id} em ${table}`);

    const query = `SELECT id FROM ${table} WHERE id = $1`;
    const result = await DB.pool.query(query, [id]);

    const exists = (result.rowCount ?? 0) > 0;
    console.log(`[selectId] ID ${id} ${exists ? "encontrado" : "não encontrado"} em ${table}`);

    return exists;
  } catch (error) {
    console.error(`[selectId] ERRO ao validar ID ${id} em ${table}:`, error);
    throw error;
  }
};

/**
 * Insere um registro na tabela tb_ifbr.
 * @param id ID do domínio IFBR.
 * @param name Nome do domínio.
 * @param data Data da resposta.
 * @param score Pontuação do domínio.
 * @param id_tupla ID da tupla IFBR para vinculação.
 */
export let insertIntoIFBR = async (
  id: number,
  name: string,
  data: Date,
  score: number,
  id_tupla: string
) => {
  try {
    console.log(`[insertIntoIFBR] Inserindo domínio IFBR ${name} (${id}) para tupla ${id_tupla}`);

    await DB.pool.query(
      `INSERT INTO tb_ifbr (id_dominio, nome, data_resposta, score, id_ifbr) VALUES ($1, $2, $3, $4, $5);`,
      [id, name, data, score, id_tupla]
    );

    console.log(`[insertIntoIFBR] Domínio IFBR ${name} inserido com sucesso`);
  } catch (error) {
    console.error(`[insertIntoIFBR] ERRO ao inserir domínio IFBR ${name}:`, error);
    throw error;
  }
};

/**
 * Atualiza o campo id_ifbr no candidato.
 * @param id ID do candidato.
 * @param id_ifbr ID IFBR para atualização.
 */
export let updateIfbrCandidato = async (id: string, id_ifbr: string) => {
  try {
    console.log(`[updateIfbrCandidato] Atualizando id_ifbr do candidato ${id} para ${id_ifbr}`);

    await DB.pool.query(`UPDATE tb_candidato SET id_ifbr = $1 WHERE id = $2;`, [
      id_ifbr,
      id,
    ]);

    console.log(`[updateIfbrCandidato] Atualização realizada com sucesso para candidato ${id}`);
  } catch (error) {
    console.error(`[updateIfbrCandidato] ERRO ao atualizar id_ifbr do candidato ${id}:`, error);
    throw error;
  }
};

/**
 * Insere os dados cruzados entre candidato e IFBR na tabela tb_candidato_ifbr.
 * Executa SELECT com JOIN para garantir dados consistentes.
 */
export const insertCandidatoIFBRData = async () => {
  const sql = `
    INSERT INTO tb_candidato_ifbr (
      tb_candidato_cpf,
      tb_candidato_id,
      tb_ifbr_id_dominio,
      tb_ifbr_score,
      tb_ifbr_id_ifbr
    )
    SELECT 
      c.cpf,
      c.id,
      i.id_dominio,
      i.score,
      c.id_ifbr
    FROM tb_candidato c
    JOIN tb_ifbr i
      ON c.id_ifbr = i.id_ifbr
    ON CONFLICT DO NOTHING;
  `;

  try {
    console.log(`[insertCandidatoIFBRData] Iniciando inserção cruzada na tb_candidato_ifbr`);

    await DB.pool.query(sql);

    console.log(`[insertCandidatoIFBRData] Inserção cruzada concluída com sucesso!`);
  } catch (error) {
    console.error(`[insertCandidatoIFBRData] ERRO ao inserir dados na tb_candidato_ifbr:`, error);
    throw error;
  }
};

/**
 * Insere um novo colaborador na tabela tb_colaborador.
 * @param id ID do colaborador.
 * @param name Nome do colaborador.
 * @param email Email do colaborador.
 * @param senha Senha do colaborador.
 * @param setor Setor do colaborador.
 */
export let insertIntoColaborador = async (
  id: string,
  name: string,
  email: string,
  senha: string,
  setor: string
) => {
  try {
    console.log(`[insertIntoColaborador] Inserindo colaborador ${id}`);

    await DB.pool.query(
      `INSERT INTO tb_colaborador (
        id_colaborador, nome, setor, email, senha
      ) VALUES (
        $1, $2, $3, $4, $5
      )`,
      [id, name, setor, email, senha]
    );

    console.log(`[insertIntoColaborador] Colaborador ${id} inserido com sucesso!`);
  } catch (error) {
    console.error(`[insertIntoColaborador] ERRO ao inserir colaborador ${id}:`, error);
    throw error;
  }
};

/**
 * Insere relação entre empresa e colaborador na tabela tb_empresa_colaborador.
 * @param id_colaborador ID do colaborador.
 * @param id_empresa ID da empresa.
 */
export let insertEmpresaColaborador = async (
  id_colaborador: string,
  id_empresa: string
) => {
  try {
    console.log(`[insertEmpresaColaborador] Iniciando inserção da relação colaborador ${id_colaborador} - empresa ${id_empresa}`);

    // Verifica se a empresa existe antes de inserir a relação
    const empresa = await DB.pool.query(
      `SELECT cnpj, razao_social FROM tb_empresa WHERE id = $1`,
      [id_empresa]
    );

    if (empresa.rowCount === 0) {
      throw new Error(`Empresa ${id_empresa} não encontrada`);
    }

    // Insere a relação ignorando conflitos (duplicates)
    const sql = `
      INSERT INTO tb_empresa_colaborador (
        tb_empresa_id,
        tb_colaborador_id_colaborador
      )
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING;
    `;

    await DB.pool.query(sql, [id_empresa, id_colaborador]);
    console.log(`[insertEmpresaColaborador] Relação colaborador-empresa inserida com sucesso!`);
  } catch (error) {
    console.error(`[insertEmpresaColaborador] ERRO ao inserir relação colaborador-empresa:`, error);
    throw error;
  }
};
/**
 * Atualiza o ID do colaborador na tabela tb_empresa.
 * @param id ID do colaborador.
 * @param id_empresa ID da empresa.
 */
export let updateColaboradorEmpresa = async (
  id: string,
  id_empresa: string
) => {
  try {
    console.log(`[updateColaboradorEmpresa] Atualizando colaborador ${id} na empresa ${id_empresa}`);

    await DB.pool.query(
      `UPDATE tb_empresa SET id_colaborador = $1 WHERE id = $2;`,
      [id, id_empresa]
    );

    console.log(`[updateColaboradorEmpresa] Atualização realizada com sucesso!`);
  } catch (error) {
    console.error(`[updateColaboradorEmpresa] ERRO ao atualizar colaborador na empresa:`, error);
    throw error;
  }
};

/**
 * Seleciona todos os registros de uma tabela.
 * @param table Nome da tabela.
 * @returns Resultado da consulta.
 */
export let selectFromTable = async (table: string): Promise<any> => {
  try {
    console.log(`[selectFromTable] Consultando todos os dados da tabela ${table}`);

    const query = `SELECT * FROM ${table};`;
    const result = await DB.pool.query(query);

    console.log(`[selectFromTable] Consulta concluída. Total de linhas: ${result.rowCount}`);
    return result;
  } catch (error) {
    console.error(`[selectFromTable] ERRO na consulta da tabela ${table}:`, error);
    throw error;
  }
};

/**
 * Seleciona um registro de uma tabela pelo ID.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @returns Resultado da consulta.
 */
export let selectFromIdWhere = async (
  table: string,
  id: string
): Promise<any> => {
  try {
    console.log(`[selectFromIdWhere] Consultando registro ID ${id} na tabela ${table}`);

    const query = `SELECT * FROM ${table} WHERE id = $1`;
    const result = await DB.pool.query(query, [id]);

    console.log(`[selectFromIdWhere] Consulta concluída. Linhas retornadas: ${result.rowCount}`);
    return result;
  } catch (error) {
    console.error(`[selectFromIdWhere] ERRO na consulta de ID ${id} na tabela ${table}:`, error);
    throw error;
  }
};

/**
 * Seleciona o campo colaborador de uma tabela baseado no ID.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @returns Resultado da consulta.
 */


/**
 * Realiza "delete" lógico, atualizando status para false.
 * @param table Nome da tabela.
 * @param id ID do registro a ser atualizado.
 * @returns Resultado da operação.
 */
export let deleteFromTable = async (
  table: string,
  id: string
): Promise<any> => {
  try {
    console.log(`[deleteFromTable] Atualizando status para false no registro ID ${id} da tabela ${table}`);

    let result = await DB.pool.query(
      `UPDATE ${table} SET status_usuario = $1 WHERE id = $2;`,
      [false, id]
    );

    console.log(`[deleteFromTable] Atualização realizada com sucesso, linhas afetadas: ${result.rowCount}`);
    return result;
  } catch (error) {
    console.error(`[deleteFromTable] ERRO ao atualizar status no registro ID ${id} da tabela ${table}:`, error);
    throw error;
  }
};

/**
 * Atualiza colunas específicas de um registro na tabela.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @param sets String formatada com colunas e placeholders (ex: "nome = $1, email = $2").
 * @param values Valores para substituição nos placeholders.
 * @returns Resultado da atualização.
 */
export let updateUserColumn = async (
  table: string,
  id: number,
  sets: string,
  values: any[]
): Promise<any> => {
  try {
    console.log(`[updateUserColumn] Atualizando registro ID ${id} na tabela ${table} com campos: ${sets}`);

    const query = `UPDATE ${table} SET ${sets} WHERE id = $${values.length + 1}`;
    values.push(id);

    const result = await DB.pool.query(query, values);

    console.log(`[updateUserColumn] Atualização concluída com sucesso, linhas afetadas: ${result.rowCount}`);
    return result;
  } catch (error) {
    console.error(`[updateUserColumn] ERRO ao atualizar registro ID ${id} na tabela ${table}:`, error);
    throw error;
  }
};
/**
 * Insere uma vaga na tabela tb_vaga.
 * @param id ID da vaga.
 * @param data_inicio Data de início da vaga.
 * @param data_fim Data final da vaga.
 * @param status_vaga Status da vaga (ativa ou não).
 * @param titulo Título da vaga.
 * @param descricao Descrição da vaga.
 * @param salario Salário ofertado.
 * @param localidade Local da vaga.
 * @param acess Acessibilidade oferecida.
 * @param id_creator ID do criador da vaga
/**
 * Insere uma nova vaga na tabela tb_vaga.
 * @param id ID único da vaga.
 * @param data_inicio Data de início da vaga.
 * @param data_fim Data de término da vaga.
 * @param status_vaga Status da vaga (ativa/inativa).
 * @param titulo Título da vaga.
 * @param descricao Descrição detalhada da vaga.
 * @param salario Valor do salário ofertado.
 * @param localidade Localidade da vaga.
 * @param acess Informação sobre acessibilidade.
 * @param id_creator ID da empresa ou colaborador que criou a vaga.
 * @returns Promise<boolean> indicando sucesso ou falha na inserção.
 */
export const insertVaga = async (
  id: string,
  data_inicio: Date,
  data_fim: Date,
  status_vaga: boolean,
  titulo: string,
  descricao: string,
  salario: number,
  localidade: string,
  acess: string,
  id_creator: string
): Promise<boolean> => {
  try {
    console.log(`[insertVaga] Iniciando inserção da vaga ID: ${id}, criada por: ${id_creator}`);

    const query = `
      INSERT INTO tb_vaga (
        id,
        data_inicio,
        data_fim,
        status_vaga,
        titulo,
        descricao,
        salario,
        localidade,
        acess,
        id_creator
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
    `;

    await DB.pool.query(query, [
      id,
      data_inicio,
      data_fim,
      status_vaga,
      titulo,
      descricao,
      salario,
      localidade,
      acess,
      id_creator,
    ]);

    console.log(`[insertVaga] Vaga ${id} inserida com sucesso!`);
    return true;
  } catch (error) {
    console.error(`[insertVaga] ERRO ao inserir vaga ${id}:`, error);
    return false;
  }
};

/**
 * Insere relação entre empresa e vaga na tabela tb_empresa_vaga.
 * @param vaga Objeto contendo os dados da vaga.
 * @param id_empresa ID da empresa relacionada à vaga.
 */
export let insertEmpVaga = async (
  vaga: {
    id: string;
    data_inicio: Date;
    data_fim: Date;
    status: boolean;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    acessibilidade: string;
  },
  id_empresa: string
) => {
  try {
    console.log(`[insertEmpVaga] Associando vaga ${vaga.id} à empresa ${id_empresa}`);

    const { id, data_inicio, data_fim, status } = vaga;
    const query = `
      INSERT INTO tb_empresa_vaga (
        tb_empresa_id,
        tb_vaga_id,
        tb_vaga_status_vaga,
        tb_vaga_data_fim,
        tb_vaga_data_inicio
      ) VALUES ($1, $2, $3, $4, $5);
    `;

    await DB.pool.query(query, [id_empresa, id, status, data_fim, data_inicio]);

    console.log(`[insertEmpVaga] Associação vaga-empresa realizada com sucesso`);
  } catch (error) {
    console.error(`[insertEmpVaga] ERRO ao associar vaga ${vaga.id} à empresa ${id_empresa}:`, error);
    throw error;
  }
};

/**
 * Busca o ID da empresa associada a um colaborador específico.
 * @param id_colaborador ID do colaborador.
 * @returns ID da empresa vinculada ao colaborador.
 */
export let getEmpByColab = async (id_colaborador: string) => {
  try {
    console.log(`[getEmpByColab] Buscando empresa para colaborador ${id_colaborador}`);

    const query = `SELECT tb_empresa_id FROM tb_empresa_colaborador WHERE tb_colaborador_id_colaborador = $1;`;
    const result = await DB.pool.query(query, [id_colaborador]);

    if (result.rowCount === 0) {
      throw new Error(`Nenhuma empresa encontrada para colaborador ${id_colaborador}`);
    }

    const emp = result.rows[0].tb_empresa_id;
    console.log(`[getEmpByColab] Empresa encontrada para colaborador ${id_colaborador}: ${emp}`);

    return emp;
  } catch (error) {
    console.error(`[getEmpByColab] ERRO ao buscar empresa para colaborador ${id_colaborador}:`, error);
    throw error;
  }
};
/**
 * Insere um candidato em uma vaga na tabela tb_candidato_vaga.
 * @param id_vaga ID da vaga.
 * @param id_candidate ID do candidato.
 * @returns Promise<boolean> indicando sucesso ou falha da operação.
 */
export const insertCandidateVaga = async (
  id_vaga: string,
  id_candidate: string
): Promise<boolean> => {
  try {
    console.log(`[insertCandidateVaga] Inserindo candidato ${id_candidate} na vaga ${id_vaga}`);

    const query = `INSERT INTO tb_candidato_vaga (tb_vaga_id, tb_candidato_id) VALUES ($1, $2);`;
    await DB.pool.query(query, [id_vaga, id_candidate]);

    console.log(`[insertCandidateVaga] Candidato ${id_candidate} inserido na vaga ${id_vaga} com sucesso`);
    return true;

  } catch (error) {
    console.error(`[insertCandidateVaga] ERRO ao inserir candidato ${id_candidate} na vaga ${id_vaga}:`, error);
    return false;
  }

}


export let validateData = async (value: string, data:string, table: string): Promise<any> => {
  try{
    let result = await DB.pool.query(`SELECT ${data} FROM ${table} WHERE ${data} = $1`, [value]);
    console.log(result.rows.length)
    return result.rows.length
  } catch (error) {
    console.error(`[insertCandidateVaga] ERRO ao buscar candidatos`, error);
    return false;
  }
}



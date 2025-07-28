/**
 * Definição das rotas da aplicação para as operações CRUD
 * e funcionalidades específicas, organizadas por entidade.
 */

// Rotas para o recurso Candidato
export let createCanditado: string = "/createCanditado";
export let getCanditado: string = "/getCanditado";
export let getCanditadoById: string = "/getCanditadoById/:id";
export let deleteCanditado: string = "/deleteCanditado/:id";
export let updateCanditado: string = "/updateCanditado/:id";

// Rotas para o recurso Contratante
export let createContratante: string = "/createContratante";
export let getContratante: string = "/getContratante";
export let getContratanteById: string = "/getContratanteById/:id";
export let deleteContratante: string = "/deleteContratante/:id";
export let updateContratante: string = "/updateContratante/:id";

// Rota para formulário IFBR, com parâmetro id para identificação
export let formIFBR: string = "/formIFBR/:id";

// Rotas para o recurso Colaborador, com ID como parâmetro
export let createColaborador: string = "/createColaborador/:id";
export let getColaborador: string = "/getColaborador/:id";

// Rotas para o recurso Vaga, com ID como parâmetro
export let createVaga: string = "/createVaga/:id";
export let candidatarVaga: string = "/registerVaga/:id";
export let getVagas: string = "/getVagas";
export let getVagasById: string = "/getVagasById/:id";
export let deleteVaga: string = "/deleteVaga/:id";

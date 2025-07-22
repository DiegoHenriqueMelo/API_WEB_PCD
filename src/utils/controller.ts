import express from "express";
import * as Routes from "../routes/routes.js";
import * as controllerCandidate from "../controller/user/controllerCandidate.js";
import * as controllerContratante from "../controller/user/controllerContratante.js";
import { controllerIFBR } from "../controller/IFBR/controllerIFBR.js";
import * as controllerColaborador from "../controller/user/controllerColaborador.js";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import {
  validateId,
  validateIdCandidato,
  validateIdContratante,
} from "../validation/validateId/validateId.js";

const APP = express();
APP.use(express.json());
APP.use(cors());

/**
 * Inicia o servidor e configura as rotas principais da aplicação
 * @param PORT - Porta do servidor HTTP
 */
export let conectServ = (PORT: string) => {
  let HTTP_PORT: number = Number(PORT);

  // Inicializa servidor HTTP na porta especificada
  APP.listen(HTTP_PORT, () => {
    console.log(`✔️ Servidor iniciado e escutando na porta ${HTTP_PORT}`);
  });

  // -----------------------------------
  // Rotas CRUD Candidato
  // -----------------------------------

  APP.post(Routes.createCanditado, async (req, res) => {
    let body = req.body;
    console.log("🚀 [POST /candidato] Requisição recebida, corpo:", body);

    let result = controllerCandidate.controllerPostCandadate(body);

    if (await result == true) {
      console.log("✔️ [POST /candidato] Candidato criado com sucesso.");
      res.status(200).send("Sucesso ao criar o candidato");
    } else {
      console.warn("❌ [POST /candidato] Falha ao criar candidato:", result);
      res.status(400).send({ message: result });
    }
  });

  APP.get(Routes.getCanditado, async (req, res) => {
    console.log("🚀 [GET /candidato] Requisição recebida");

    try {
      let result = await controllerCandidate.controllerGetCandidato();
      console.log("✔️ [GET /candidato] Resultado recebido:", result);

      if (Array.isArray(result)) {
        res.status(200).send(result);
      } else {
        console.warn("⚠️ [GET /candidato] Nenhum candidato encontrado:", result);
        res.status(404).send({ message: result });
      }
    } catch (error) {
      console.error("❌ [GET /candidato] Erro ao buscar candidatos:", error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  });

  APP.get(Routes.getCanditadoById, async (req, res) => {
    const id = String(req.params.id);
    console.log(`🚀 [GET /candidato/${id}] Requisição recebida`);

    try {
      let result = await controllerCandidate.controllerGetCandidatoById(id);
      console.log(`✔️ [GET /candidato/${id}] Resultado recebido:`, result);

      if (result && typeof result === "object") {
        res.status(200).send(result);
      } else {
        console.warn(`⚠️ [GET /candidato/${id}] Candidato não encontrado:`, result);
        res.status(404).send({ message: result });
      }
    } catch (error) {
      console.error(`❌ [GET /candidato/${id}] Erro ao buscar candidato:`, error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  });

  APP.delete(Routes.deleteCanditado, async (req, res) => {
    const id = Number(req.params.id);
    console.log(`🚀 [DELETE /candidato/${id}] Requisição recebida`);

    try {
      let result = await controllerCandidate.controllerDeleteCandidato(id);
      if (result) {
        console.log(`✔️ [DELETE /candidato/${id}] Candidato deletado com sucesso.`);
        res.status(200).send({ message: "Candidato deletado com sucesso!" });
      } else {
        console.warn(`⚠️ [DELETE /candidato/${id}] Candidato não encontrado.`);
        res.status(404).send({ message: "Candidato não encontrado!" });
      }
    } catch (error) {
      console.error(`❌ [DELETE /candidato/${id}] Erro ao deletar candidato:`, error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  });

  APP.put(Routes.updateCanditado, async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    console.log(`🚀 [PUT /candidato/${id}] Requisição recebida com dados:`, body);

    try {
      const result = await controllerCandidate.controllerUpdateCandidato(id, body);
      console.log(`✔️ [PUT /candidato/${id}] Atualização concluída:`, result);
      res.status(200).json({ status: "sucesso", result });
    } catch (error) {
      console.error(`❌ [PUT /candidato/${id}] Erro na atualização:`, error);
      res.status(500).json({ error: "Erro ao atualizar candidato." });
    }
  });

  // -----------------------------------
  // Rotas CRUD Contratante
  // -----------------------------------

  APP.post(Routes.createContratante, (req, res) => {
    let body = req.body;
    console.log("🚀 [POST /contratante] Requisição recebida, corpo:", body);

    let result = controllerContratante.controllerContratante(body);
    if (result) {
      console.log("✔️ [POST /contratante] Contratante criado com sucesso.");
      res.status(200).send(result);
    } else {
      console.warn("❌ [POST /contratante] Falha ao criar contratante:", result);
      res.status(400).send({ message: result });
    }
  });

  APP.get(Routes.getContratante, async (req, res) => {
    console.log("🚀 [GET /contratante] Requisição recebida");

    let result = await controllerContratante.controllerGetContratante();
    console.log("✔️ [GET /contratante] Resultado recebido:", result);

    if (result) {
      res.status(200).send(result);
    } else {
      console.warn("⚠️ [GET /contratante] Nenhum contratante encontrado.");
      res.status(400).send({ message: result });
    }
  });

  APP.get(Routes.getContratanteById, async (req, res) => {
    const id = String(req.params.id);
    console.log(`🚀 [GET /contratante/${id}] Requisição recebida`);

    let result = await controllerContratante.controllerGetContratanteById(id);
    console.log(`✔️ [GET /contratante/${id}] Resultado recebido:`, result);

    if (result) {
      res.status(200).send(result);
    } else {
      console.warn(`⚠️ [GET /contratante/${id}] Contratante não encontrado.`);
      res.status(400).send({ message: result });
    }
  });

  APP.delete(Routes.deleteContratante, async (req, res) => {
    const id = Number(req.params.id);
    console.log(`🚀 [DELETE /contratante/${id}] Requisição recebida`);

    let result = await controllerContratante.controllerDeleteContratante(id);
    if (result) {
      console.log(`✔️ [DELETE /contratante/${id}] Contratante deletado com sucesso.`);
      res.status(200).send(result);
    } else {
      console.warn(`⚠️ [DELETE /contratante/${id}] Contratante não encontrado.`);
      res.status(400).send({ message: result });
    }
  });

  APP.put(Routes.updateContratante, async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    console.log(`🚀 [PUT /contratante/${id}] Requisição recebida com dados:`, body);

    let result = await controllerContratante.controllerUpdateContratante(id, body);
    if (result) {
      console.log(`✔️ [PUT /contratante/${id}] Atualização concluída.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [PUT /contratante/${id}] Falha na atualização.`);
      res.status(400).send({ message: result });
    }
  });

  // -----------------------------------
  // Rota CRUD IFBR - Formulário
  // -----------------------------------

  APP.post(Routes.formIFBR, async (req, res) => {
    const ID = req.params.id;
    const form = req.body;

    console.log(`🚀 [POST /formIFBR/${ID}] Requisição recebida, formulário:`, form);

    let result = controllerIFBR(ID, form);
    if ((await result) == true) {
      console.log(`✔️ [POST /formIFBR/${ID}] Formulário processado com sucesso.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [POST /formIFBR/${ID}] Erro ao processar formulário.`);
      res.status(400).send({ message: "Erro ao criar candidato!" });
    }
  });

  // -----------------------------------
  // Rotas CRUD Colaborador
  // -----------------------------------

  APP.post(Routes.createColaborador, (req, res) => {
    let body = req.body;
    let id = req.params.id;

    console.log(`🚀 [POST /colaborador/${id}] Requisição recebida, corpo:`, body);

    let result = controllerColaborador.controllerColaborador(body, id);
    if (result) {
      console.log(`✔️ [POST /colaborador/${id}] Colaborador criado com sucesso.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [POST /colaborador/${id}] Falha ao criar colaborador.`);
      res.status(400).send({ message: "Erro ao criar colaborador!" });
    }
  });

  APP.get(Routes.getColaborador, async (req, res) => {
    const id = String(req.params.id);
    console.log(`🚀 [GET /colaborador/${id}] Requisição recebida`);

    console.log(`Tipo do ID recebido: ${typeof id}`);

    let result = await controllerColaborador.controllerGetColaborador(
      "tb_empresa",
      id
    );
    if (result) {
      console.log(`✔️ [GET /colaborador/${id}] Resultado recebido.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [GET /colaborador/${id}] Erro ao buscar colaboradores.`);
      res.status(400).send({ message: "Erro ao buscar colaboradores!" });
    }
  });

  // -----------------------------------
  // Middlewares para validação de IDs
  // -----------------------------------

  let idIsValid = async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id);

    console.log(`🔍 Validando ID contratante: ${id}`);

    let isValid: boolean = await validateIdContratante(id);
    console.log(`Resultado validação: ${isValid}`);

    if (isValid === false) {
      console.warn("❌ ID inválido - apenas empresas ou colaboradores podem criar vagas.");
      res
        .status(400)
        .send({ message: "ID inválido, Apenas Empresas podem criar vagas!" });
    }
     else {
      console.log("✔️ ID validado, prosseguindo...");
      next();
    }
  };

  let idIsValidVaga = async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id);

    console.log(`🔍 Validando ID candidato: ${id}`);

    let isValid: any = validateIdCandidato(id);
    console.log(`Resultado validação: ${isValid}`);

    if (isValid === false) {
      console.warn("❌ ID inválido - apenas candidatos podem se inscrever.");
      res
        .status(400)
        .send({ message: "ID inválido, Apenas Candidatos podem se inscrever à vagas!" });
    } else {
      console.log("✔️ ID validado, prosseguindo...");
      next();
    }
  };

  // -----------------------------------
  // Rotas CRUD Vaga
  // -----------------------------------

  APP.post(Routes.createVaga, idIsValid, (req, res) => {
    let body = req.body;
    let id = req.params.id;

    console.log(`🚀 [POST /vaga/${id}] Requisição recebida, corpo:`, body);

    let result = controllerColaborador.postVaga(body, id);

    if (result) {
      console.log(`✔️ [POST /vaga/${id}] Vaga criada com sucesso.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [POST /vaga/${id}] Falha ao criar vaga.`);
      res.status(400).send({ message: "Erro ao criar vaga!" });
    }
  });

  APP.post(Routes.candidatarVaga,idIsValidVaga, (req, res) => {
    let id_vaga= String(Object.values(req.body));
    let id_candidate = req.params.id;

    console.log(`🚀 [POST /vaga/candidatar/${id_candidate}] Requisição recebida para vaga: ${id_vaga}`);

    let result = controllerCandidate.candidatarVaga(id_candidate, id_vaga);
    if (result) {
      console.log(`✔️ [POST /vaga/candidatar/${id_candidate}] Candidatura realizada com sucesso.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [POST /vaga/candidatar/${id_candidate}] Falha ao candidatar.`);
      res.status(400).send({ message: "Erro ao candidatar a vaga!" });
    }
  });
};

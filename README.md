# 🧠 APL PCD API - Sistema de Gestão de Inclusão Profissional

Bem-vindo ao repositório da **APL PCD API**, uma aplicação robusta construída com **Node.js + TypeScript + PostgreSQL** que tem como missão promover a inclusão profissional de pessoas com deficiência no mercado de trabalho. A API realiza a intermediação entre **candidatos, empresas, vagas e colaboradores**, oferecendo um controle padronizado, validado e seguro.

---

## REPOSITÓRIO ORIGINAL
O repositório original com branch e commits personalidades pode ser encontrado em  [Github](https://github.com/caua-mendonca/APL_PCD_API). Códigos de minha autoria

## 📊 Objetivo do Projeto

O projeto visa a criação de uma **plataforma back-end** completa para:

- Gestão de candidatos PCD;
- Criação e vinculação de vagas com empresas;
- Cadastro de colaboradores responsáveis;
- Controle de relacionamento entre entidades (Ex: empresa ↔ vaga, candidato ↔ vaga);
- Foco total em aderência a **normas legais de contratação PCD**, sem qualquer funcionalidade relacionada a triagens psicológicas.

---

## 🧱 Estrutura do Projeto

A arquitetura do projeto é baseada em **padrões MVC desacoplados**, visando escalabilidade, manutenibilidade e clareza de código:
````bash
src/
├── config/
├── controller/
│ │   └── user/
│ ├── IFBR/
├── model/
│ ├── entities/
│ │   └── class/
│ ├── user/
│ │   ├── updateUser/
│ │   ├── createUser/
│ │   ├── deleteUser/
│ │   └── getUser/
│ ├── createIFBR/
│ └── vaga/
├── repository/
│   └── queryTools.ts
├── routes/
│   └── routes.ts
├── utils/
│   └── controller.ts
├── validation/
│   └── validateData.ts
│   └── validateId.ts
├── index.ts
└── .env
````

---

## 🛢️ Estrutura do Banco de Dados

A API interage diretamente com o PostgreSQL utilizando as seguintes tabelas (atualizadas):

- `tb_candidato`
- `tb_candidato_ifbr`
- `tb_candidato_vaga`
- `tb_colaborador`
- `tb_empresa`
- `tb_empresa_colaborador`
- `tb_empresa_vaga`
- `tb_ifbr`
- `tb_vaga`


---

## ✅ Funcionalidades Implementadas

- [x] Cadastro e validação de **candidatos PCD** (com CPF e data de nascimento validados);
- [x] Cadastro e vinculação de **colaboradores** a empresas;
- [x] Cadastro de **vagas** com controle de status;
- [x] **Relacionamento** de empresas com vagas (`tb_empresa_vaga`);
- [x] **Inscrição** de candidatos em vagas (`tb_candidato_vaga`);
- [x] Integração com **instituições IFBR** e vínculo com candidatos;
- [x] Estrutura modular com **validações de dados centralizadas**;
- [x] Logs padronizados com mensagens claras e técnicas.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **PostgreSQL**
- **dotenv** para variáveis de ambiente
- **Arquitetura em camadas (MVC/Repository)**
- **Validações personalizadas** (CPF, CNPJ, idade, ID padrão etc, Data de publicação de Caga)

---

## 📂 Padrão de ID Utilizado

Todos os registros utilizam IDs no formato:

````bash
PREFIXO + Número Aleatório
Ex: CAND-563829, EMP-193920, VAGA-763239, COLAB-87274, ...
````


As funções de geração e verificação de IDs garantem unicidade e conformidade com a nomenclatura por entidade.

---

## 🧪 Validações Aplicadas

- Validação de CPF com algoritmo oficial
- Validação de idade mínima
- Validação de ID customizado por entidade
- Tratamento e logs para campos obrigatórios ausentes ou mal formatados

---

## 🔐 Segurança

- Uso de variáveis de ambiente (.env) para separar credenciais sensíveis
- Sanitização básica de entrada via validações e prepared statements (via `$1`, `$2`...)

---

## 🚀 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/apl-pcd-api.git

# Acesse o diretório
cd apl-pcd-api

# Instale as dependências
npm install

# Configure o banco e variáveis de ambiente (.env)
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=

# Rode o servidor
npm run start
````

## 🧑‍💻 Contribuição

Pull requests são bem-vindos! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feat/minha-funcionalidade`)
3. Commit com conventional commit (`git commit -m "feat: adicionado recurso X"`)
4. Push na develop (`git push origin develop`)
5. Abra o Pull Request 🎉

---

## 🧠 Autor

**Dev Melo** — Desenvolvedor de Software em ascensão 🚀  
Apaixonado por clean code, logs claros e café com TypeScript.

Contato: [LinkedIn](https://www.linkedin.com/in/devmelo/) | [Github](https://github.com/DiegoHenriqueMelo)





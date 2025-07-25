import * as DB from "../../repositories/queryTools.js";

/**
 * Valida um CNPJ verificando formato, repetição e dígitos verificadores.
 * @param cnpj - string com 14 dígitos do CNPJ a validar
 * @returns true se CNPJ válido, false caso contrário
 */
export function validateCNPJ(cnpj: string): boolean {
  if (!cnpj) return false; // ❌ Falha se cnpj for nulo ou vazio

  if (cnpj.length !== 14) return false; // ❌ Falha se tamanho diferente de 14

  // ❌ Falha se todos os dígitos forem iguais (ex: 00000000000000)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  // Função interna para calcular dígito verificador do CNPJ
  const calcularDigito = (base: string, pesos: number[]) => {
    const soma = base
      .split("")
      .reduce((acc, num, i) => acc + parseInt(num) * pesos[i], 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  // Pega os 12 primeiros dígitos do CNPJ (base)
  const base = cnpj.slice(0, 12);

  // Calcula primeiro dígito verificador com pesos específicos
  const digito1 = calcularDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  // Calcula segundo dígito verificador adicionando o primeiro dígito ao base
  const digito2 = calcularDigito(
    base + digito1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  // Compara o CNPJ original com o base + dígitos verificadores calculados
  return cnpj === base + digito1.toString() + digito2.toString();
}

export let validateCNPJToDB = async (
  values: string,
  data: string,
  table: string
) => {
  let result = await DB.validateData(values, data, table);

  result > 0 ? (result = false) : (result = true);

  console.log("RESULTADO DA FUNÇÃO validateCpfToDB:", result);

  return result;
};

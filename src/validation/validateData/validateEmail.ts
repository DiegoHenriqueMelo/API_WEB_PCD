import * as DB from "../../repositories/queryTools.js";

export let validateEmailToDB = async (value: string, data:string, table: string): Promise<any> => {
  let result: any = Number(await DB.validateData(value, data, table));
  result > 0 ? result = false :result =  true;

  console.log("RESULTADO DA FUNÇÃO validateEmailToDB:", result);

  return result;
};

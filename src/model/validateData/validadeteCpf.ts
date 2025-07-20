export let validateCpf = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let validate: number[] = cpf.split('').map(Number);
  let validateChar1 = 0;
  let validateChar2 = 0;

  for (let i = 0; i < 9; i++) {
    validateChar1 += (10 - i) * validate[i];
    validateChar2 += (11 - i) * validate[i];
  }

  validateChar1 = (validateChar1 * 10) % 11;
  if (validateChar1 === 10) validateChar1 = 0;

  validateChar2 = ((validateChar2 + validateChar1 * 2) * 10) % 11;
  if (validateChar2 === 10) validateChar2 = 0;

  return validate[9] === validateChar1 && validate[10] === validateChar2;
};

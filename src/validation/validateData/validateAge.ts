export let validateAge = (data_nascimento: Date): boolean => {
    let dateCandidate = new Date(data_nascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - dateCandidate.getFullYear();
  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();
  const mesNascimento = dateCandidate.getMonth();
  const diaNascimento = dateCandidate.getDate();

  // Se ainda não fez aniversário neste ano, subtrai 1
  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade >= 18;
};
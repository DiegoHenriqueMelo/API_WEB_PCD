export let validateTel = (tel: string):number => {
  tel = tel
    .split("")
    .filter((char) => char !== "-")
    .join("");
  tel = tel
    .split("")
    .filter((char) => char !== "(")
    .join("");
      tel = tel
    .split("")
    .filter((char) => char !== ")")
    .join("");
     
    return Number(tel)
};

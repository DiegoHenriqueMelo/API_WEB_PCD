export let validateDate = (date: Date): boolean => {
  const currentDate = new Date();
  return date > currentDate;
}
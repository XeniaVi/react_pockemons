export const getStatsColor = (number) => {
  if (number > 170) return "#00733C";
  if (number > 85) return "#FFAA00";
  return "#FFAA00";
};

export const createList = (length) => {
  const arr = [];

  for (let id = 0; id < length; id++) {
    arr.push({ id, name: id });
  }

  return arr;
};

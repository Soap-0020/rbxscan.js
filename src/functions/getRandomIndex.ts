const getRandomIndex = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default getRandomIndex;
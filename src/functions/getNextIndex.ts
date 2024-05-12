const getNextIndex = (array: any[], currentIndex: number | null): number => {
  if (currentIndex == null || array.length == currentIndex + 1) return 0;
  return currentIndex + 1;
};

export default getNextIndex;

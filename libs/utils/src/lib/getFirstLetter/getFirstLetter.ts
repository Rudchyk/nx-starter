export const getFirstLetter = (srt?: string) => {
  if (!srt) {
    return 'A';
  }
  const firstLetter = srt[0];
  return firstLetter.toUpperCase();
};

export default getFirstLetter;

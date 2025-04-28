
const profanityList = [
  "abuse", "damn", "hell", // This is a minimal list, expand as needed
];

export const filterProfanity = (text: string): string => {
  let filteredText = text.toLowerCase();
  profanityList.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredText = filteredText.replace(regex, '*'.repeat(word.length));
  });
  return filteredText;
};


export async function getWordSuggestions(word: string): Promise<any> {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const suggestions: { type: string; words: string[] }[] = [];

    if (data && data.length > 0 && data[0].meanings) {
      data[0].meanings.forEach((meaning: any) => {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          suggestions.push({ type: "synonyms", words: meaning.synonyms });
        }
        if (meaning.antonyms && meaning.antonyms.length > 0) {
          suggestions.push({ type: "antonyms", words: meaning.antonyms });
        }
      });
    }
    return suggestions;
  } catch (error) {
    console.error("Error fetching word suggestions:", error);
    return [];
  }
}



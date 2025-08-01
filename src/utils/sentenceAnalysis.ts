import { ParseEnglish } from 'parse-english';
import { inspect } from 'unist-util-inspect';

export function analyzeSentenceStructure(text: string): string {
  const tree = new ParseEnglish().parse(text);
  return inspect(tree);
}



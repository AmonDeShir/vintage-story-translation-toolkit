
export type TranslationDocument = {
  [key: string]: string;
}


export type Word = {
  id: string;
  word: string;
  translation: string;
}

export type Document = {
  id: string;
  words: string[];
}

export type CommandWord = Omit<Word, "id">;

export type Word = {
  id: string;
  key: string;
  source: string;
  translation: string;
}

export type Document = {
  id: string;
  name: string;
  words: string[];
}
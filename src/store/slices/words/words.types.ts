export type CommandWord = Omit<Word, "id" | "translation">;

export type Word = {
  id: string;
  key: string;
  source: string;
  translation: string;
};

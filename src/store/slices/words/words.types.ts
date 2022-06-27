export type CommandWord = Omit<Word, "id">;

export type Word = {
  id: string;
  key: string;
  source: string;
  translation: string;
};

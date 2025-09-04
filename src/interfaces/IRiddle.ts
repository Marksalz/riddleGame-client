export interface IRiddle {
  _id: string;
  name: string;
  taskDescription: string;
  correctAnswer: string;
  difficulty: string;
  timeLimit: number;
  hint: string;
  choices: string[];
}

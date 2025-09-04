export interface IRiddle {
  name: string;
  taskDescription: string;
  correctAnswer: string;
  difficulty: string;
  timeLimit: number;
  hint: string;
  choices: string[];
}

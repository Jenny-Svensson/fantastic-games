import IGame from "./IGame";

interface IConsole {
  id: number;
  name: string;
  games: IGame[];
}

export default IConsole;
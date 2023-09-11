
import IGameDetailsData from "./IGameDetailsData";

interface IConsole {
  id: number;
  name: string;
  games: IGameDetailsData[];
}

export default IConsole;
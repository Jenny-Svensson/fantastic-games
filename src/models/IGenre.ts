import IGameDetailsData from "./IGameDetailsData";

interface IGenre {
    id: number;
    name: string;
    games: IGameDetailsData[];

}

export default IGenre;
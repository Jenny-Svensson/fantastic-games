import IGameDetailsData from "./IGameDetailsData";

interface IGenreDetailsData {
    id: number;
    name: string;
    image_background: string;
    games: IGameDetailsData[];
}

export default IGenreDetailsData;
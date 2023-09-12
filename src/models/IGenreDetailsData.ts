import IGameDetailsData from "./IGameDetailsData";

interface IGenreDetailsData {
    map(arg0: (genre: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id: number;
    name: string;
    image_background: string;
    games: IGameDetailsData[];
}

export default IGenreDetailsData;
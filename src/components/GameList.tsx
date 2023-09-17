import GameDetails from "./GameDetails";
import AllGames from "./AllGames";
import IConsole from "../models/IConsole";
import IGameDetailsData from "../models/IGameDetailsData";

interface GameListProps {
  games: IGameDetailsData[];
  selectedConsole?: IConsole | null;
}

export default function GameList({ games, selectedConsole }: GameListProps) {
  if (selectedConsole) {
    return (
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4" key={game.id}>
            <div className="card mb-3">
              <div className="card-body">
                <GameDetails gameId={game.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    // No selected console, show the AllGames component
    return <AllGames />;
  }
}

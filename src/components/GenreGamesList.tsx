import GameDetails from "./GameDetails";
import AllGames from "./AllGames";
import IGameDetailsData from "../models/IGameDetailsData";

interface GenreGamesListProps {
  games: IGameDetailsData[];
  selectedGenre?: string;
}

export default function GenreGamesList({
  games,
  selectedGenre,
}: GenreGamesListProps) {
  if (selectedGenre) {
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
    // No selected genre, show the AllGames component
    return <AllGames />;
  }
}

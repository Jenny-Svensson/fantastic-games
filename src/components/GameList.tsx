import GameDetails from "./GameDetails";
import AllGames from "./AllGames";

interface IConsole {
  id: number;
  name: string;
}

interface GameListProps {
  games: IConsole[];
  selectedConsole: IConsole | null;
}

export default function GameList({ games, selectedConsole }: GameListProps) {
  if (selectedConsole) {
    // Render games for the selected console
    return (
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4" key={game.id}>
            <div className="card mb-3">
              {/* You can render other details here */}
              <div className="card-body">
                <h3 className="card-title">{game.name}</h3>
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

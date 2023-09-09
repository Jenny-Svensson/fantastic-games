import GameDetails from "./GameDetails";

interface IConsole {
  id: number;
  name: string;
  background_image: string;
}

interface GameListProps {
  games: IConsole[];
}

export default function GameList({ games }: GameListProps) {
  // Split the games into groups of 3
  const gamesInRows = [];
  for (let i = 0; i < games.length; i += 3) {
    const row = games.slice(i, i + 3);
    gamesInRows.push(row);
  }
  return (
    <div>
      {gamesInRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((game) => (
            <div className="col-md-4" key={game.id}>
              <div className="card mb-3">
                <img
                  src={game.background_image}
                  className="card-img-top"
                  alt={game.name}
                />
                <div className="card-body">
                  <GameDetails gameId={game.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

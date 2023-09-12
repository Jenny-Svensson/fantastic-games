interface GenreGamesListProps {
  selectedGenre: string;
  games: { id: number; name: string }[];
}

export default function GenreGamesList({ games }: GenreGamesListProps) {
  const gamesInRows = [];
  for (let i = 0; i < games.length; i += 3) {
    gamesInRows.push(games.slice(i, i + 3));
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          {gamesInRows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((game) => (
                <div className="col-md-4" key={game.id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <p className="card-text">{game.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

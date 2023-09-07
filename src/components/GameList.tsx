interface IConsole {
  id: number;
  name: string;
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
                  src="..."
                  className="card-img-top"
                  alt="..."
                  onError={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.onerror = null;
                    target.src = ""; // link to fallback img
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{game.name}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

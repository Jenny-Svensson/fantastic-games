interface IGame {
  id: number;
  name: string;
}

interface GameListProps {
  games: IGame[];
}

export default function GameList({ games }: GameListProps) {
  return (
    <div>
      <ul className="list-group">
        {games.map((game) => (
          <li key={game.id} className="list-group-item">
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

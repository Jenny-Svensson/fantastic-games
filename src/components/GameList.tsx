interface IConsole {
  id: number;
  name: string;
}

interface GameListProps {
  games: IConsole[];
}

export default function GameList({ games }: GameListProps) {
  return (
    <div>
      <ul className="list-group">
        {games.map((game) => (
          <li key={game.id} className="list-group-item list-group-item-dark">
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

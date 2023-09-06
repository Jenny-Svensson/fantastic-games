import axios from "axios";
import { useEffect, useState } from "react";

interface IGame {
  id: number;
  name: string;
}

export default function Consols() {
  const [consoles, setConsoles] = useState<IGame[]>([]);
  const [selectedGame, setSelectedGame] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/platforms?key=8182b6a257ae4c869c18ba6d8de3a607"
        );
        setConsoles(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Consol List</h1>
      <ul className="list-group">
        {consoles.map((console, i) => (
          <li
            key={console.id}
            className={
              selectedGame === i ? "list-group-item active" : "list-group-item"
            }
            onClick={() => {
              setSelectedGame(i);
            }}
          >
            {console.name}
          </li>
        ))}
      </ul>
    </>
  );
}

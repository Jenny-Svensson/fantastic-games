import axios from "axios";
import { useEffect, useState } from "react";
import GameList from "./GameList";

interface IGame {
  id: number;
  name: string;
}

interface IConsole {
  id: number;
  name: string;
  games: IGame[];
}

export default function Consoles() {
  const [consoles, setConsoles] = useState<IConsole[]>([]);
  const [selectedConsoleIndex, setSelectedConsoleIndex] = useState<
    number | null
  >(null);
  const [showAllConsoles, setShowAllConsoles] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/platforms?key=8182b6a257ae4c869c18ba6d8de3a607"
        );
        // Modify the API data structure to match our defined types
        const modifiedData: IConsole[] = response.data.results.map(
          (console: any) => ({
            id: console.id,
            name: console.name,
            games: console.games, // Access the "games" key within each console object
          })
        );
        setConsoles(modifiedData); // Set the consoles state with the modified data
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle console item click
  const handleConsoleClick = (index: number) => {
    setSelectedConsoleIndex(index); // Set the selectedConsoleIndex state to the clicked index
  };

  // Function to show all consoles
  const handleShowAllConsoles = () => {
    setShowAllConsoles(true);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2">
            <div className="d-flex flex-column">
              {consoles
                .slice(0, showAllConsoles ? consoles.length : 4)
                .map((console, i) => (
                  <div
                    key={console.id}
                    className={`mb-2 ${
                      selectedConsoleIndex === i ? "bg-light" : ""
                    }`}
                    onClick={() => handleConsoleClick(i)}
                  >
                    <div className="p-2">{console.name}</div>
                  </div>
                ))}
            </div>
            {!showAllConsoles && (
              <button className="btn btn-link" onClick={handleShowAllConsoles}>
                Show More
              </button>
            )}
          </div>
          <div className="col-md-10">
            {selectedConsoleIndex !== null && (
              <div className="games-for-console">
                <h3>{`Games for ${consoles[selectedConsoleIndex].name}`}</h3>
                <GameList games={consoles[selectedConsoleIndex].games} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

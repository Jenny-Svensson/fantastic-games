import axios from "axios";
import { useEffect, useState } from "react";
import GameList from "./GameList";
import IConsole from "../models/IConsole";

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

        const modifiedData: IConsole[] = response.data.results.map(
          (console: any) => ({
            id: console.id,
            name: console.name,
            games: console.games, // Access the "games" key within each console object
          })
        );

        setConsoles(modifiedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleConsoleClick = (index: number) => {
    setSelectedConsoleIndex(index);
    setShowAllConsoles(false); // Hide the AllGames component when a console is selected
  };

  const handleShowAllConsoles = () => {
    setSelectedConsoleIndex(null); // Deselect the console
    setShowAllConsoles(true);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {/* Left column for ConsoleList */}
          <div className="col-md-2">
            <h4>Consoles</h4>
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
              {!showAllConsoles && (
                <button
                  className="btn btn-primary"
                  onClick={handleShowAllConsoles}
                >
                  Show More
                </button>
              )}
            </div>
          </div>
          {/* Right column for GameList */}
          <div className="col-md-10">
            {selectedConsoleIndex !== null ? (
              <div className="games-for-console">
                <h3>{`Games for ${consoles[selectedConsoleIndex].name}`}</h3>
                <GameList
                  games={consoles[selectedConsoleIndex].games}
                  selectedConsole={consoles[selectedConsoleIndex]}
                />
              </div>
            ) : (
              <GameList games={[]} selectedConsole={null} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import IGame from "../models/IGame"; // Import the IConsole interface from the model folder

export default function AllGames() {
  const [games, setGames] = useState<IGame[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    "https://api.rawg.io/api/games?key=8182b6a257ae4c869c18ba6d8de3a607"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [prevPageUrl, setPrevPageUrl] = useState<string>("");

  useEffect(() => {
    fetchGameData(currentPageUrl);
  }, [currentPageUrl]);

  function fetchGameData(url: string) {
    axios.get(url).then((response) => {
      setGames(response.data.results);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
    });
  }

  function gotoNextPage() {
    if (nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
    }
  }

  function gotoPrevPage() {
    if (prevPageUrl) {
      setCurrentPageUrl(prevPageUrl);
    }
  }

  // Split the games into groups of 3
  const gamesInRows: IGame[][] = [];
  for (let i = 0; i < games.length; i += 3) {
    const row = games.slice(i, i + 3);
    gamesInRows.push(row);
  }

  return (
    <>
      <h1>All Games</h1>
      {gamesInRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((game) => (
            <div className="col-md-4" key={game.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <h3 className="card-title">{game.name}</h3>
                  {/* Render other game details here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Pagination gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
    </>
  );
}

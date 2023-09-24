import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import IGameDetailsData from "../models/IGameDetailsData";
import GameDetails from "./GameDetails";

export default function AllGames() {
  const [games, setGames] = useState<IGameDetailsData[]>([]);
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

  const gamesInRows: IGameDetailsData[][] = [];
  for (let i = 0; i < games.length; i += 3) {
    const row = games.slice(i, i + 3);
    gamesInRows.push(row);
  }

  return (
    <>
      <h1 className="mb-4">All Games</h1>
      <Pagination gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
      {gamesInRows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((game) => (
            <div className="col-md-4" key={game.id}>
              <div className="card mb-3">
                <div className="card-body">
                  <GameDetails gameId={game.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

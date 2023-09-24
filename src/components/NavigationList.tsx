import axios from "axios";
import { useEffect, useState } from "react";
import GameList from "./GameList";
import IConsole from "../models/IConsole";
import GenreGamesList from "./GenreGamesList";
import AllGames from "./AllGames";
import IGenreDetailsData from "../models/IGenreDetailsData";
import IGameDetailsData from "../models/IGameDetailsData";

const API_KEY = "8182b6a257ae4c869c18ba6d8de3a607";

export default function NavigationList() {
  // State for consoles, genres, and display settings
  const [consoles, setConsoles] = useState<IConsole[]>([]);
  const [genres, setGenres] = useState<IGenreDetailsData[]>([]);
  const [showAllGenres, setShowAllGenres] = useState<boolean>(false);
  const [showAllGames, setShowAllGames] = useState<boolean>(true);
  const [showAllConsoles, setShowAllConsoles] = useState<boolean>(false);

  // State for selected console, selected genre, and games for the selected genre
  const [selectedConsoleIndex, setSelectedConsoleIndex] = useState<
    number | null
  >(null);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [gamesForSelectedGenre, setGamesForSelectedGenre] = useState<
    IGameDetailsData[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch console data
        const consolesResponse = await axios.get(
          `https://api.rawg.io/api/platforms?key=${API_KEY}`
        );
        const modifiedConsolesData: IConsole[] =
          consolesResponse.data.results.map((console: any) => ({
            id: console.id,
            name: console.name,
            games: console.games,
          }));
        setConsoles(modifiedConsolesData);

        // Fetch genre data
        const genresResponse = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        setGenres(genresResponse.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Handle selecting a console
  const handleConsoleClick = (index: number) => {
    setSelectedConsoleIndex(index); // Set the selected console index
    setShowAllConsoles(false); // Hide "All Consoles" when a console is selected
    setSelectedGenreId(null); // Deselect the genre
    setShowAllGenres(false); // Hide all genres
    setShowAllGames(false); // Hide "All Games"
  };

  // Handle selecting a genre
  const handleGenreClick = async (genreId: number) => {
    try {
      const gamesResponse = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}`
      );

      setSelectedGenreId(genreId);
      setGamesForSelectedGenre(gamesResponse.data.results); // Set the games for the selected genre
      setShowAllGenres(false); // Hide genre list
      setSelectedConsoleIndex(null); // Deselect the console
      setShowAllConsoles(false); // Hide all consoles
      setShowAllGames(false); // Hide "All Games"

      console.log(`Clicked on genre with ID: ${genreId}`);
    } catch (error) {
      console.error("Error fetching genre games: ", error);
    }
  };

  // Handle showing all games
  const handleShowAllGames = () => {
    setSelectedConsoleIndex(null); // Deselect the console
    setShowAllConsoles(true); // Show all consoles
    setSelectedGenreId(null); // Deselect the genre
    setShowAllGenres(true); // Show all genres
    setShowAllGames(true); // Show "All Games"
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left column for ConsoleList and GenreList */}
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleShowAllGames}>
            All games
          </button>

          <h4 className="navigation-h4">
            {" "}
            <span className="material-symbols-outlined">
              stadia_controller
            </span>{" "}
            Consoles
          </h4>
          <div className="d-flex flex-column">
            {consoles
              .slice(0, showAllConsoles ? consoles.length : 4)
              .map((console, i) => (
                <div
                  key={console.id}
                  className={`mb-2 custom-console ${
                    selectedConsoleIndex === i ? "bg-secondary " : ""
                  }`}
                  onClick={() => handleConsoleClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleConsoleClick(i);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select Console: ${console.name}`}
                  aria-selected={selectedConsoleIndex === i}
                >
                  <div className="p-2">{console.name}</div>
                </div>
              ))}
            {!showAllConsoles && (
              <button
                className="btn btn-primary"
                onClick={() => setShowAllConsoles(true)}
              >
                Show More
              </button>
            )}
          </div>
          <h4 className="navigation-h4">
            <span className="material-symbols-outlined">gamepad</span> Genres
          </h4>
          <div className="d-flex flex-column">
            {genres.slice(0, showAllGenres ? genres.length : 4).map((genre) => (
              <div
                key={genre.id}
                className="mb-2 custom-console"
                onClick={() => handleGenreClick(genre.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="p-2">{genre.name}</div>
              </div>
            ))}
            {!showAllGenres && (
              <button
                className="btn btn-primary"
                onClick={() => setShowAllGenres(true)}
              >
                Show More
              </button>
            )}
          </div>
        </div>
        {/* Right column for GameList or GenreGamesList */}
        <div className="col-md-10">
          {selectedConsoleIndex !== null ? (
            <div className="games-for-console">
              <h3>{`Games for ${consoles[selectedConsoleIndex].name}`}</h3>
              <GameList
                games={consoles[selectedConsoleIndex].games}
                selectedConsole={consoles[selectedConsoleIndex]}
              />
            </div>
          ) : selectedGenreId ? (
            <div className="games-for-console">
              <h3>{`Games for ${
                genres.find((genre) => genre.id === selectedGenreId)?.name
              }`}</h3>
              <GenreGamesList
                selectedGenre={
                  genres.find((genre) => genre.id === selectedGenreId)?.name ||
                  ""
                }
                games={gamesForSelectedGenre}
              />
            </div>
          ) : showAllGames ? (
            <div className="games-for-console">
              <AllGames />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import IGenre from "../models/IGenre";

export default function GenreList() {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [showAllGenres, setShowAllGenres] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/genres?key=8182b6a257ae4c869c18ba6d8de3a607"
        );
        setGenres(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const visibleGenres = showAllGenres ? genres : genres.slice(0, 4);

  return (
    <>
      <div className="col-md-2">
        <h4>Genres</h4>
        <div className="d-flex flex-column">
          {visibleGenres.map((genre, index) => (
            <div
              key={index}
              className={`mb-2`}
              onClick={() => {}}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Select Genre: ${genre}`}
            >
              <div className="p-2">{genre.name}</div>
            </div>
          ))}
        </div>
      </div>
      {!showAllGenres && (
        <button
          className="btn btn-primary btn-block"
          onClick={() => setShowAllGenres(true)}
        >
          Show More
        </button>
      )}
    </>
  );
}

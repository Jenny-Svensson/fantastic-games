import axios from "axios";
import { useEffect, useState } from "react";
import MoreDetailsPage from "./MoreDetailsPage";
import IGameDetailsData from "../models/IGameDetailsData";

interface GameDetailsProps {
  gameId: number;
}

export default function GameDetails({ gameId }: GameDetailsProps) {
  const [gameDetails, setGameDetails] = useState<IGameDetailsData | null>(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  useEffect(() => {
    const fetchData = `https://api.rawg.io/api/games/${gameId}?key=8182b6a257ae4c869c18ba6d8de3a607`;

    axios
      .get(fetchData)
      .then((response) => {
        setGameDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching game details: ", error);
      });
  }, [gameId]);

  if (!gameDetails) {
    return <div>Loading game details....</div>;
  }

  const moreDetailPage = () => {
    console.log("clicked to open");
    setShowMoreDetails(true);
  };

  const closeMoreDetailPage = () => {
    console.log("clicked to close");
    setShowMoreDetails(false);
  };

  return (
    <div>
      <h3>{gameDetails.name}</h3>
      <p>Release Date: {gameDetails.released}</p>
      <p>Rating: {gameDetails.rating}</p>
      <button className="btn btn-primary" onClick={moreDetailPage}>
        More
      </button>
      {showMoreDetails && (
        <MoreDetailsPage
          gameDetails={gameDetails}
          onClose={closeMoreDetailPage}
        />
      )}
    </div>
  );
}

import React from "react";
import { GameDetailsData } from "./GameDetails";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface MoreDetailsPageProps {
  gameDetails: GameDetailsData;
  onClose: () => void;
}

export default function MoreDetailsPage({
  gameDetails,
  onClose,
}: MoreDetailsPageProps) {
  return (
    <Modal show={true} onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Game Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={gameDetails.background_image}
          alt={gameDetails.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p>Release Date: {gameDetails.released}</p>
        <p>Rating: {gameDetails.rating}</p>
        <p>Description: {gameDetails.description}</p>
        {/* Add more details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import IGameDetailsData from "../models/IGameDetailsData";

interface MoreDetailsPageProps {
  gameDetails: IGameDetailsData;
  onClose: () => void;
}

export default function MoreDetailsPage({
  gameDetails,
  onClose,
}: MoreDetailsPageProps) {
  return (
    <Modal show={true} onHide={onClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="details">Game Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={gameDetails.background_image}
          alt={gameDetails.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p className="details">Release Date: {gameDetails.released}</p>
        <p className="details">Rating: {gameDetails.rating}</p>
        <p className="details">Description: {gameDetails.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

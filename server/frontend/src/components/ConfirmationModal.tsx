import { Button, Modal } from "react-bootstrap";

function ConfirmationModal(
  description: String,
  confirmFunc: (args: any) => void,
  confirmText?: String
) {
  confirmText = confirmText || "Confirm";

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="danger" onClick={confirmFunc}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ConfirmationModal;

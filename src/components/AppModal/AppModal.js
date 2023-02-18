import { SettingsPhoneTwoTone } from "@mui/icons-material";
import { useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const AppModal = ({ setShow, show, id, cancelFunc }) => {
  const reasonRef = useRef()
  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <input
            style={{
              width: 460,
              height: 50,
              border: 0,
            }}
            ref={reasonRef}
            type="text"
            placeholder="What is the reason?"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              //   cancelFunc(id);
              setShow(false)
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              cancelFunc(id, reasonRef.current.value);
              setShow(false)

              //   handleClose();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppModal;

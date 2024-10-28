import React from "react";

import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  //   const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add a new Cabin</Button>
        </Modal.Open>

        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

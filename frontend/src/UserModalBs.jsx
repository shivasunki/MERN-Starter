import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function UserModalBs({ id, username, email, contact, city, showmodal, handleModalClose, handleSave, setUserModalData, usermodalData }) {
  
  return (
    <>
      <Modal show={showmodal} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Update Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form" onSubmit={handleSave} id="updateForm">
              <div>
                <input
                  className="form-control"
                  name="username"
                  value={usermodalData.username}
                  onChange={e=>setUserModalData({...usermodalData, username: e.target.value})}
                />
              </div>
              <div>
                <input className="form-control" name="email" value={usermodalData.email} 
                onChange={e=>setUserModalData({...usermodalData, email: e.target.value})}
                />
              </div>
              <div>
                <input
                  className="form-control"
                  name="contact"
                  value={usermodalData.contact}
                  onChange={e=>setUserModalData({...usermodalData, contact: e.target.value})}
                />
              </div>
              <div>
                <input className="form-control" name="city" value={usermodalData.city} 
                onChange={e=>setUserModalData({...usermodalData, city: e.target.value})}
                />
              </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button form="updateForm" variant="primary" onClick={handleSave}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

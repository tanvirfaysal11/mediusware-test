import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AllContactsModal = ({ show, setShow, data, showAnother }) => {

  /**
    * State section 
  */

  const modalClose = () => setShow(false);
  const [checkEven, setCheckEven] = useState(false);

  /**
    * Even handler function
  */

  const handleChangeEven = (checked) => {
    setCheckEven(checked);
  }

  /**
   * Handle change modal functionality
  */

  const handleSwitch = () => {
    showAnother(true);
    modalClose();
  }
  
  return (
    <div>
      <Modal show={show} onHide={modalClose} centered>
        <Modal.Header closeButton>
          <Button variant="primary" className="mx-2">
            All Contacts
          </Button>
          <Button onClick={handleSwitch} variant="primary" className="mx-2">
            Us Contacts
          </Button>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Country</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, index) => (
                  <tr key={index}>
                    {
                      checkEven ? item.id % 2 === 0 &&
                        <>
                          <td>{item.id}</td>
                          <td>{item.country.name}</td>
                          <td>{item.phone}</td>
                        </> :
                        <>
                          <td>{item.id}</td>
                          <td>{item.country.name}</td>
                          <td>{item.phone}</td>
                        </>
                    }
                  </tr>
                ))}
            </tbody>
          </table>
        </Modal.Body>
        <div className="float-left">
          <label className="mx-3">Only Even</label>
          <input onChange={(e) => handleChangeEven(e.target.checked)} type="checkbox" />
        </div>
        <Modal.Footer>
          <Button variant="danger" onClick={modalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllContactsModal;

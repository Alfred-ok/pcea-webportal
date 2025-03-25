/*
import React, { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CFormInput,
  CFormSelect
} from "@coreui/react";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Messages = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [messageType, setMessageType] = useState("specialservice");
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://197.232.170.121:8594/api/registrations/getmessages?MessageType=${messageType}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [messageType]);

  const handleEdit = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!selectedMessage) return;

    fetch("http://197.232.170.121:8594/api/registrations/UpdateMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: selectedMessage.id,
        Message: selectedMessage.messages,
        MessageType: selectedMessage.messageType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.status = "57"? 
        Swal.fire({
          icon: "error",
          title: data.statusDescription,
          text: "Failed to update message.",
        })
        :
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Message updated successfully!",
        });
        setShowModal(false);
        console.log(data)
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update message.",
        });
        console.error("Error updating message:", error);
      });
  };

  console.log(selectedMessage)

  return (
    <div className="p-4">
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>
            <CAlert color="primary" variant="solid">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <MdReceiptLong className="nav-icon" size={40} />
                  <h3 style={{ marginLeft: "10px" }}>Messages</h3>
                </div>
                <div>
                  <CButton color="light" variant="outline" onClick={() => navigate("/postmessages")}>
                    Send Messages
                  </CButton>
                </div>
              </div>
            </CAlert>
          </CCardTitle>

          <CTable striped bordered hover>
            <CTableHead>
              <CTableRow color="primary">
                <CTableHeaderCell>Message ID</CTableHeaderCell>
                <CTableHeaderCell>MessageType</CTableHeaderCell>
                <CTableHeaderCell>Messages</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((item) => (
                <CTableRow key={item.id} className="text-center border">
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.messageType}</CTableDataCell>
                  <CTableDataCell>{item.messages}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleEdit(item)}>
                      Edit
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
                  <CPagination align="center" className="mt-3">
                  <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                  </CPaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <CPaginationItem
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </CPaginationItem>
                </CPagination>
            </CTableBody>
          </CTable>

          <CModal visible={showModal} onClose={() => setShowModal(false)}>
            <CModalHeader>
              <CModalTitle>Edit Message</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                label="Message"
                value={selectedMessage?.messages || ""}
                onChange={(e) =>
                  setSelectedMessage({ ...selectedMessage, messages: e.target.value })
                }
              />
              <CFormSelect
                label="Message Type"
                value={selectedMessage?.messageType || ""}
                onChange={(e) =>
                  setSelectedMessage({ ...selectedMessage, messageType: e.target.value })
                }
              >
                <option value="SpecialService">Special Service</option>
                <option value="holycommunion">Holy Communion</option>
                <option value="firstservice">First Service</option>
                <option value="Secondservice">Second Service</option>
                <option value="Congrats">Congrats</option>
              </CFormSelect>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </CButton>
              <CButton color="primary" onClick={handleUpdate}>
                Update
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Messages;
*/


import React, { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CFormInput,
  CFormSelect
} from "@coreui/react";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Messages = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [messageType, setMessageType] = useState("specialservice");
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [tableRefresh, setTableRefresh] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/getmessages?MessageType=${messageType}`,/*`http://197.232.170.121:8594/api/registrations/getmessages?MessageType=${messageType}`*/)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [messageType, tableRefresh]);

  console.log(data)

  const handleEdit = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!selectedMessage) return;

    fetch(`${import.meta.env.VITE_BASE_URL}/UpdateMessages`/*"http://197.232.170.121:8594/api/registrations/UpdateMessages"*/, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: selectedMessage.id,
        Messages: selectedMessage.messages,
        MessagesType: selectedMessage.messageType,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.statusDescription = "success"? 
        Swal.fire({
          icon: "success",
          title: data.statusDescription,
          text: "Message updated successfully!",
        })
        :
        Swal.fire({
          icon: "error",
          title: data.statusDescription,
          text: "Failed to update message.",
        })
        
        
        setShowModal(false);
        console.log(data)
        setTableRefresh(!tableRefresh);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update message.",
        });
        console.error("Error updating message:", error);
      });
  };

  console.log(selectedMessage)
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="p-4">
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>
            <CAlert color="primary" variant="solid">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <MdReceiptLong className="nav-icon" size={40} />
                  <h3 style={{ marginLeft: "10px" }}>Messages</h3>
                </div>
                <div>
                  <CButton color="light" variant="outline" onClick={() => navigate("/postmessages")}>
                    Send Messages
                  </CButton>
                </div>
              </div>
            </CAlert>
          </CCardTitle>

          {/* Filter Dropdown */}
          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <div>
              <label style={{ marginRight: "10px" }}>Filter by MessageType:</label>
              <select
                style={{ padding: "2px" }}
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
              >
                <option value="Special Service">Special Service</option>
                <option value="Holy Communion">Holy Communion</option>
                <option value="First Service">First Service</option>
                <option value="Second Service">Second Service</option>
              </select>
            </div>
            <div>
              <label style={{ marginRight: "10px" }}>Items per page: </label>
              <select style={{ padding: "2px" }} value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <CTable striped bordered hover>
            <CTableHead>
              <CTableRow color="primary">
                <CTableHeaderCell>Message ID</CTableHeaderCell>
                <CTableHeaderCell>MessageType</CTableHeaderCell>
                <CTableHeaderCell>Messages</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData && currentData.map((item) => (
                <CTableRow key={item.id} className="text-center border">
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.messageType}</CTableDataCell>
                  <CTableDataCell>{item.messages}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleEdit(item)}>
                      Edit
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          <CPagination align="center" className="mt-3">
            <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <CPaginationItem
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </CPaginationItem>
          </CPagination>


          <CModal visible={showModal} onClose={() => setShowModal(false)}>
            <CModalHeader>
              <CModalTitle>Edit Message</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                label="Message"
                value={selectedMessage?.messages || ""}
                onChange={(e) =>
                  setSelectedMessage({ ...selectedMessage, messages: e.target.value })
                }
              />
              <CFormSelect
                label="Message Type"
                value={selectedMessage?.messageType || ""}
                onChange={(e) =>
                  setSelectedMessage({ ...selectedMessage, messageType: e.target.value })
                }
              >
                <option value="Special Service">Special Service</option>
                <option value="Holy Communion">Holy Communion</option>
                <option value="First Service">First Service</option>
                <option value="Second Service">Second Service</option>
              </CFormSelect>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </CButton>
              <CButton color="primary" onClick={handleUpdate}>
                Update
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Messages;

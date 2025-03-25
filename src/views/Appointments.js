
import { useState, useEffect } from "react";
import { CAlert, CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from "@coreui/react";
import { useSchedule } from "./ScheduleContext"
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setSelectedAppointments, selectedAppointments } = useSchedule(); // Use context

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/GetAppointmentsbydepartment?department=Parish Office`/*"http://197.232.170.121:8594/api/registrations/GetAppointmentsbydepartment?department=Parish Office"*/);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  console.log(appointments);

  console.log(selectedAppointments);

  return (
    <CCard className="max-w-4xl mx-auto shadow-lg">
      <CCardHeader>
        <CAlert color="primary" variant="solid">
              <div style={{ display: "flex" }}>
                <h3 style={{ marginLeft: "10px" }}>Appointments</h3>
              </div>
        </CAlert>
      </CCardHeader>
      <CCardBody>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <CTable striped hover responsive>
            <CTableHead color="primary">
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                {/*<CTableHeaderCell>Service Type</CTableHeaderCell>*/}
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>ZP Number</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Appointment Type</CTableHeaderCell>
               {/* <CTableHeaderCell>Status</CTableHeaderCell>*/}
                <CTableHeaderCell>Notes</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {appointments.map((appointment) => (
                <CTableRow key={appointment.id}>
                  <CTableDataCell>{appointment.id}</CTableDataCell>
                  {/*<CTableDataCell>{appointment.serviceType}</CTableDataCell>*/}
                  <CTableDataCell>{appointment.ministerName}</CTableDataCell>
                  <CTableDataCell>{appointment.zpNumber}</CTableDataCell>
                  <CTableDataCell>{appointment.department}</CTableDataCell>
                  <CTableDataCell>{appointment.appointmentType}</CTableDataCell>
                  {/*<CTableDataCell>{appointment.status}</CTableDataCell>*/}
                  <CTableDataCell>{appointment.notes}</CTableDataCell>
                  <CTableDataCell><CButton color="primary" onClick={()=>{setSelectedAppointments(appointment); navigate("/ScheduleMeeting")}}>Schedule meeting</CButton></CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Appointments;



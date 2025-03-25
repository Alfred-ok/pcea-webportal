






import { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from "@coreui/react";

const Counsellor = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          //"http://197.232.170.121:8594/api/registrations/GetAppointmentsbydepartment?department=Couscelling"
          `${import.meta.env.VITE_BASE_URL}/GetAppointmentsbydepartment?department=Couscelling`
        );
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

  return (
    <CCard className="max-w-4xl mx-auto p-4" style={{border:"none"}}>
      <CCardHeader>
        <h2 className="text-xl font-semibold">Appointments</h2>
      </CCardHeader>
      <CCardBody>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                {/*<CTableHeaderCell>Service Type</CTableHeaderCell>*/}
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>ZP Number</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Appointment Type</CTableHeaderCell>
               {/* <CTableHeaderCell>Status</CTableHeaderCell>*/}
                <CTableHeaderCell>Notes</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {appointments.map((appointment) => (
                <CTableRow key={appointment.id}>
                  <CTableDataCell>{appointment.id}</CTableDataCell>
                  <CTableDataCell>{appointment.ministerName}</CTableDataCell>
                  {/*<CTableDataCell>{appointment.serviceType}</CTableDataCell>*/}
                  <CTableDataCell>{appointment.zpNumber}</CTableDataCell>
                  <CTableDataCell>{appointment.department}</CTableDataCell>
                  <CTableDataCell>{appointment.appointmentType}</CTableDataCell>
                  {/*<CTableDataCell>{appointment.status}</CTableDataCell>*/}
                  <CTableDataCell>{appointment.notes}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Counsellor;



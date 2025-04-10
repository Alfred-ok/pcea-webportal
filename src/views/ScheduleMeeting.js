
/*
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import { CAlert, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilClock } from '@coreui/icons';

const ScheduleMeeting = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);

  const scheduleMeeting = () => {
    if (!title) {
      alert('Please enter a meeting title');
      return;
    }
    setMeetings([...meetings, { title, date }]);
    setTitle('');
  };

  return (
    <CCard>
     <CCardHeader className="mt-2">
          <CAlert color="primary" variant="solid" style={{display:"flex", alignItems:"center"}}>
            <CIcon icon={cilClock} size='xxl' style={{marginRight:"8px"}} />
            <h3 style={{ color: "#fff" }}>Meeting</h3>
          </CAlert>   
     </CCardHeader>
    <CCardBody>
    <CRow style={{display:"flex"}}>
    <CCol md={4}>
        <h2>Schedule Meeting</h2>
        <input
            type="text"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
        />
        <br />
        <DatePicker 
            selected={date} 
            onChange={(date) => setDate(date)} 
            showTimeSelect 
            dateFormat="Pp"
            className="form-control"
        />
        <br /><br />
        <button onClick={scheduleMeeting} style={{ padding: '10px', cursor: 'pointer' }}>Schedule Meeting</button>
        <br /><br />
      </CCol>

      <CCol md={8}> 
        <h3>Meeting Calendar</h3>
        <Calendar
            value={date}
            tileContent={({ date }) => {
            const meeting = meetings.find(m => new Date(m.date).toDateString() === date.toDateString());
            return meeting ? <p style={{ fontSize: '12px', color: 'red' }}>{meeting.title}</p> : null;
            }}
        />
      </CCol>
      
    </CRow>
    </CCardBody>
    </CCard>
  );
};

export default ScheduleMeeting;

*/
/*

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput } from "@coreui/react";
import { createSchedule, updateSchedule, getSchedule, deleteSchedule } from "./api";
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const localizer = momentLocalizer(moment);

const ScheduleMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState("");
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        fetchSchedule();
    }, []);

    //const fetchSchedule = async () => {
    //    const data = await getSchedule();
    //    setEvents(data);
    //    console.log(events)
    //};
    const fetchSchedule = async () => {
        try {
            const response = await fetch("http://197.232.170.121:8594/api/registrations/GetAllSchedules");
            const data = await response.json();
    
            // Ensure data is properly formatted for the Calendar
            const formattedEvents = data.map(event => ({
                id: event.id, // Ensure unique ID is used
                title: event.Reason, // Reason as the title
                start: moment(event.Date, "YYYY-MM-DD").toDate(), // Convert Date to proper format
                end: moment(event.Date, "YYYY-MM-DD").toDate(),
            }));
    
            setEvents(formattedEvents);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };
    

    const handleCreate = async () => {
        const newSchedule = { Date: date.toISOString().split("T")[0], Name: "Reason", Reason: reason };
        await createSchedule(newSchedule);
        fetchSchedule();
    };

    const handleUpdate = async () => {
        const updatedSchedule = { Id: 1, Date: date.toISOString().split("T")[0], Name: "Reason", Reason: reason };
        await updateSchedule(updatedSchedule);
        fetchSchedule();
    };

    const handleDelete = async (id) => {
        await deleteSchedule(id);
        fetchSchedule();
    };

    console.log(events)

    return (
        <CCard>
            <CCardHeader>Schedule a Meeting</CCardHeader>
            <CModal
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="StaticBackdropExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel">Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div style={{display:"flex", flexDirection:"column", }}>
                        <label>Select Date:</label>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} style={{borderRadius:"10px", padding:"5px"}}/>
                    </div>
                    <CFormInput type="text" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                    <CButton onClick={handleCreate} color="primary" className="m-2">Create Schedule</CButton>
                    <CButton onClick={handleUpdate} color="warning" className="m-2">Update Schedule</CButton>
                </CModalBody>
                <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                </CButton>
                <CButton color="primary">Save changes</CButton>
                </CModalFooter>
            </CModal>
           



            <CCardBody>
            <CButton color="primary" onClick={() => setVisible(!visible)}>
                Schedule a Meeting
            </CButton>
            </CCardBody>





            <CCardBody>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 400 }}
                />
                {events.map(event => (
                    <div key={event.id}>
                        <span>{event.Reason} - {moment(event.start).format("YYYY-MM-DD")}</span>
                        <CButton onClick={() => handleDelete(event.id)} color="danger" className="m-2">Delete</CButton>
                    </div>
                ))}
            </CCardBody>
        </CCard>
    );
};

export default ScheduleMeeting;
*/

/*
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput } from "@coreui/react";
import { createSchedule, updateSchedule, getSchedule, deleteSchedule } from "./api";
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

const localizer = momentLocalizer(moment);

const ScheduleMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState("");
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // For updating events

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await fetch("http://197.232.170.121:8594/api/registrations/GetAllSchedules");
            const data = await response.json();

            // Format events for Big Calendar
            const formattedEvents = data.map(event => ({
                id: event.id,
                title: event.Reason,
                start: moment(event.Date, "YYYY-MM-DD").toDate(),
                end: moment(event.Date, "YYYY-MM-DD").toDate(),
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    const handleCreate = async () => {
        const newSchedule = { Date: date.toISOString().split("T")[0], Name: "Reason", Reason: reason };
        await createSchedule(newSchedule);
        fetchSchedule();
        setVisible(false);
    };

    const handleUpdate = async () => {
        if (!selectedEvent) return alert("Select an event to update");

        const updatedSchedule = { 
            Id: selectedEvent.id, 
            Date: date.toISOString().split("T")[0], 
            Name: "Reason", 
            Reason: reason 
        };

        await updateSchedule(updatedSchedule);
        fetchSchedule();
        setSelectedEvent(null); // Reset selection after update
        setVisible(false);
    };

    const handleDelete = async (id) => {
        await deleteSchedule(id);
        fetchSchedule();
    };

    console.log(events)

    return (
        <CCard>
            <CCardHeader>Schedule a Meeting</CCardHeader>
            
            <CModal
                backdrop="static"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="StaticBackdropExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle id="StaticBackdropExampleLabel">
                        {selectedEvent ? "Update Meeting" : "Schedule Meeting"}
                    </CModalTitle>
                </CModalHeader>
                
                <CModalBody>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label>Select Date:</label>
                        <DatePicker 
                            selected={date} 
                            onChange={(date) => setDate(date)} 
                            className="form-control"
                        />
                    </div>
                    <CFormInput 
                        type="text" 
                        placeholder="Reason" 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)} 
                    />
                </CModalBody>
                
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                    {selectedEvent ? (
                        <CButton onClick={handleUpdate} color="warning">Update Schedule</CButton>
                    ) : (
                        <CButton onClick={handleCreate} color="primary">Create Schedule</CButton>
                    )}
                </CModalFooter>
            </CModal>

            <CCardBody>
                <CButton color="primary" onClick={() => { setVisible(true); setSelectedEvent(null); }}>
                    Schedule a Meeting
                </CButton>
            </CCardBody>

            <CCardBody>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 400 }}
                    onSelectEvent={(event) => {
                        setSelectedEvent(event);
                        setReason(event.title);
                        setDate(event.start);
                        setVisible(true);
                    }}
                />
                {events.map(event => (
                    <div key={event.id}>
                        <span>{event.title} - {moment(event.start).format("YYYY-MM-DD")}</span>
                        <CButton onClick={() => handleDelete(event.id)} color="danger" className="m-2">
                            Delete
                        </CButton>
                    </div>
                ))}
            </CCardBody>
        </CCard>
    );
};

export default ScheduleMeeting;

*/
/*
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CButton, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

const localizer = momentLocalizer(moment);

const ScheduleMeeting = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateOrUpdate = () => {
    if (!title) return alert("Please enter a meeting title");
    
    if (selectedEvent) {
      setEvents(events.map(event => event.id === selectedEvent.id ? { ...event, title, start: date, end: date } : event));
    } else {
      setEvents([...events, { id: Date.now(), title, start: date, end: date }]);
    }
    
    setModalVisible(false);
    setTitle("");
    setDate(new Date());
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    setEvents(events.filter(event => event.id !== selectedEvent.id));
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <h2>Meeting Scheduler</h2>
      <CButton color="primary" onClick={() => { setModalVisible(true); setSelectedEvent(null); }}>Schedule a Meeting</CButton>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "20px" }}
        onSelectEvent={event => { setSelectedEvent(event); setTitle(event.title); setDate(event.start); setModalVisible(true); }}
      />
      
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>{selectedEvent ? "Edit Meeting" : "Schedule Meeting"}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput type="text" placeholder="Meeting Title" value={title} onChange={e => setTitle(e.target.value)} />
          <DatePicker selected={date} onChange={setDate} className="form-control mt-2" showTimeSelect dateFormat="Pp" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          {selectedEvent && <CButton color="danger" onClick={handleDelete}>Delete</CButton>}
          <CButton color="primary" onClick={handleCreateOrUpdate}>{selectedEvent ? "Update" : "Create"}</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ScheduleMeeting;
*/

/*

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

const localizer = momentLocalizer(moment);

const ScheduleMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState("");
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const response = await fetch("http://197.232.170.121:8594/api/registrations/GetAllSchedules");
            const data = await response.json();
            const formattedEvents = data.map(event => ({
                id: event.id,
                title: event.Reason,
                start: moment(event.Date, "YYYY-MM-DD").toDate(),
                end: moment(event.Date, "YYYY-MM-DD").toDate(),
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    console.log(events);

    const handleCreate = async () => {
        const newSchedule = { Date: date, Name: "Reason", Reason: reason };
        try {
            await fetch("http://197.232.170.121:8594/api/registrations/CreateSchedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSchedule),
            });
            fetchSchedule();
            console.log("succcess");
        } catch (error) {
            console.error("Error creating schedule:", error);
        }
    };

    return (
        <CCard>
            <CCardHeader>Schedule a Meeting</CCardHeader>
            <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Schedule a Meeting</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <label>Select Date:</label>
                    <DatePicker selected={date} onChange={setDate} className="form-control" />
                    <CFormInput type="text" placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                    <CButton onClick={handleCreate} color="primary" className="m-2">Create Schedule</CButton>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>
            <CCardBody>
                <CButton color="primary" onClick={() => setVisible(!visible)}>Schedule a Meeting</CButton>
            </CCardBody>
            <CCardBody>
                <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{ height: 400 }} />
            </CCardBody>
        </CCard>
    );
};

export default ScheduleMeeting;
*/


import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CCard, CCardBody, CCardHeader, CButton, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CAlert, CFormLabel, CFormTextarea, CFormCheck } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilWarning } from "@coreui/icons";
import { useSchedule } from "./ScheduleContext"


const localizer = momentLocalizer(moment);

const ScheduleMeeting = () => {
    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState("");
    const [events, setEvents] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { selectedAppointments } = useSchedule(); // Use context
    const [appointmentsModal, setAppointmentsModal] = useState(false)
    const [deleteCheck, setDeleteCheck] = useState(false)

   

    useEffect(() => {
        if (selectedAppointments) {
             setAppointmentsModal(selectedAppointments && true)
            if(selectedAppointments.notes){
            setReason(`From ${selectedAppointments.appointmentType} by ${selectedAppointments.ministerName}. Reason for application is ${selectedAppointments.notes}.`);
            }else if(selectedAppointments.name){
                setReason(`A ${selectedAppointments.reasonForApplication} appointment has been scheduled for ${selectedAppointments.name}. The member's contact number is +254${selectedAppointments.mobileNumber}.`);
            }else{
                setReason("")
            }
        }
        

    }, [selectedAppointments]); // Runs only when selectedAppointments changes

    console.log(selectedAppointments);
    

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/GetAllSchedules`/*"http://197.232.170.121:8594/api/registrations/GetAllSchedules"*/);
            if (!response.ok) throw new Error("Failed to fetch schedules");
            const data = await response.json();
            const formattedEvents = data.map(event => ({
                id: event.id,
                title: event.reason,
                start: moment(event.date).toDate(), // Includes time
                end: moment(event.date).add(1, "hour").toDate(), // Adjust duration if needed
                allDay: false // Allow specific time
            }));
            setEvents(formattedEvents);
           
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(events);

    const handleSelectSlot = (slotInfo) =>{
        setVisible(!visible);
        setDate(slotInfo.start)
        setReason("")
    }

   

    const handleCreate = async () => {
        setLoading(true);
        setError(null);



        // Combine date and time into a single formatted string
        //const formattedDateTime = moment(date).format("YYYY-MM-DD HH:mm");

        const newSchedule = { Date: /*formattedDateTime*/ moment(date).format("YYYY-MM-DD"), Name: "Reason", Reason: reason };
    
        console.log(newSchedule);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/CreateSchedule`/*"http://197.232.170.121:8594/api/registrations/CreateSchedule"*/, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSchedule),
            });
            if (!response.ok) throw new Error("Failed to create schedule");
            fetchSchedule();
            setVisible(false);
            setAppointmentsModal(false)
        } catch (error) {
            setError(error.message);
            setAppointmentsModal(false)
            setReason("")
        } finally {
            setLoading(false);
            setReason("")
        }
    };


    const handleDelete = async () => {
        if (!selectedEvent) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/schedule/${selectedEvent.id}`/*`http://197.232.170.121:8594/api/registrations/schedule/${selectedEvent.id}`*/, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete schedule");
            fetchSchedule();
            setDeleteModal(false);
            setReason("")
        } catch (error) {
            setError(error.message);
            setReason("")
        } finally {
            setLoading(false);
            setReason("")
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setDeleteModal(true);
    };

    console.log(date);


    return (
        <CCard className="shadow-lg">
            <CCardHeader>
                <CAlert variant="solid">
                <h3>Schedule a Meeting</h3>
                </CAlert>
            </CCardHeader>
            {error && <CAlert color="danger">{error}</CAlert>}



            <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Schedule a Meeting</CModalTitle>
                </CModalHeader>

                <CModalBody>
                    <CFormTextarea placeholder="Reason"  rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
                    <CButton onClick={handleCreate} color="primary" className="m-2" disabled={loading}>{loading ? "Creating..." : "Create Schedule"}</CButton>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>



            <CModal visible={deleteModal} onClose={() => setDeleteModal(false)}>
                <CModalHeader>
                    <CModalTitle style={{color:"#0d6efd"}}>View Schedule Meeting</CModalTitle>
                </CModalHeader>
                <CModalBody style={{textAlign:"center"}}>
                   <div className="mb-4">
                   <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="currentColor"
                        className="bi bi-calendar-week"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                   </div>
                    <h6 className="mb-3">{selectedEvent?.title}</h6>
                     <p>  Schedule Date - {moment(selectedEvent?.start).format("YYYY-MM-DD HH:mm")}</p> 
                </CModalBody>
                <CModalFooter style={{display:"flex", flexDirection:"column",alignItems:"center", justifyContent:"center"}}>
                    <CFormCheck reverse id="reverseCheckbox1" style={{marginTop:"5px"}} checked={deleteCheck} onChange={()=>setDeleteCheck(!deleteCheck)} label="checkbox if want to delete" /><br/>
                    {deleteCheck &&
                    <CButton onClick={handleDelete} color="danger" style={{color:"#fff"}} className="m-1" disabled={loading}>
                        <CIcon icon={cilTrash} className="flex-shrink-0 me-2" width={18} height={18} />
                        {loading ? "Deleting..." : "Delete"}
                    </CButton>}
                </CModalFooter>
            </CModal>


            <CModal backdrop="static" visible={ appointmentsModal}  >
                <CModalHeader>
                    <CModalTitle>Schedule Meeting</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    
                    <CFormLabel htmlFor="to">
                        Reason
                    </CFormLabel>
                    <CFormTextarea
                        id="exampleFormControlTextarea1"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason"
                    ></CFormTextarea>
                    
                    <CFormLabel htmlFor="to">
                        Date
                    </CFormLabel>
                    <CFormInput 
                        id="to" 
                        type="date" 
                        //value={moment(date).format("YYYY-MM-DD")} 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                       /* onChange={(e) => setDate(moment(date).set({
                            year: moment(e.target.value).year(),
                            month: moment(e.target.value).month(),
                            date: moment(e.target.value).date()
                        }).toDate())} */
                        placeholder="Date" />
                    {/*
                    <CFormLabel htmlFor="time">
                        Time
                    </CFormLabel>
                    <CFormInput 
                        id="time" 
                        type="time" 
                        value={moment(date).format("HH:mm")} 
                        onChange={(e) => setDate(moment(date).set({
                            hour: moment(e.target.value, "HH:mm").hour(),
                            minute: moment(e.target.value, "HH:mm").minute()
                        }).toDate())} 
                        placeholder="Time" 
                    />
                    */}
                    <CButton onClick={handleCreate} color="primary" className="mt-3" disabled={loading}>{loading ? "Creating..." : "Create Schedule"}</CButton>
                    
                </CModalBody>
                <CModalFooter>
                </CModalFooter>
            </CModal>
            <CCardBody>
                {loading ? 
                <p>Loading events...</p> : 
                <Calendar 
                    localizer={localizer} 
                    events={events} 
                    startAccessor="start" 
                    endAccessor="end" 
                    allDayAccessor="allDay" 
                    style={{ height: 800 }} 
                    selectable={true}
                    onSelectSlot={handleSelectSlot} 
                    onSelectEvent={handleSelectEvent}   
                    />}

            
            </CCardBody>
        </CCard>
    );
};

export default ScheduleMeeting;

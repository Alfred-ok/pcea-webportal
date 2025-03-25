import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [selectedAppointments, setSelectedAppointments] = useState({});

  

  return (
    <ScheduleContext.Provider value={{ selectedAppointments, setSelectedAppointments }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);

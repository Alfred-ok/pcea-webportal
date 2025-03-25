

const BASE_URL = "http://197.232.170.121:8594/api/registrations";
let create = null;
let update = null;
let schedule = null;
let deleteScheduled = null;

export const createSchedule = async (data) => {
   
    try {
        const response = await fetch(`${BASE_URL}/CreateSchedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Ensure response is not already consumed
        if (!response.ok) {
            const errorText = await response.text(); // Read the response as text if there's an error
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        // Parse JSON only once
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error in createSchedule:", error);
        throw error;
    }
};


export const updateSchedule = async (data) => {
    const response = await fetch(`${BASE_URL}/UpdateSchedule`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    update = response.json()
    return response.json();
};
/*
export const getSchedule = async (reason, date) => {
    const response = await fetch(`${BASE_URL}/schedule?reason=${reason}&date=${date}`);
    schedule = response.json()
    return response.json();
};
*/

/*
export const getSchedule = async (reason, date) => {
    try {
        const response = await fetch(`${BASE_URL}/schedule?reason=${encodeURIComponent(reason)}&date=${date}`);
        
        if (!response.ok) {
            throw new Error(`Error fetching schedule: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching schedule:", error);
        return []; // Return an empty array to prevent crashes
    }
};
*/

export const getSchedule = async () => {
        try {
            const response = await fetch(`${BASE_URL}/GetAllSchedules`);
            const data = await response.json();
    
            // Ensure data is properly formatted for the Calendar
            const formattedEvents = data.map(event => ({
                id: event.id, // Ensure unique ID is used
                title: event.Reason, // Reason as the title
                start: moment(event.Date, "YYYY-MM-DD").toDate(), // Convert Date to proper format
                end: moment(event.Date, "YYYY-MM-DD").toDate(),
            }));
    
            //setEvents(formattedEvents);
            return formattedEvents
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }

};


export const deleteSchedule = async (id) => {
    const response = await fetch(`${BASE_URL}/schedule/${id}`, { method: "DELETE" });
    deleteScheduled = response.json()
    return response.json();
};


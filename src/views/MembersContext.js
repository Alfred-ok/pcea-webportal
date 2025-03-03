// src/MembersContext.js
import React, { createContext, useState } from "react";

// Create the context
export const MembersContext = createContext();

// Create a provider component
export const MembersProvider = ({ children }) => {
  // Initialize members state
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: "Mark",
      lastName: "Otto",
      mobile: "@mdo",
      email: "otto@gmail.com",
      receiving: true,
      cardNumber: "", // Add cardNumber field
      cardSerialNumber: "", // Add cardSerialNumber field
    },
    {
      id: 2,
      firstName: "Jacob",
      lastName: "Thornton",
      mobile: "@fat",
      email: "otto@gmail.com",
      receiving: true,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 3,
      firstName: "Larry",
      lastName: "Bird",
      mobile: "@twitter",
      email: "otto@gmail.com",
      receiving: true,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 4,
      firstName: "Robbie",
      lastName: "Right",
      mobile: "01150010978",
      email: "robbie@gmail.com",
      receiving: false,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 5,
      firstName: "Ashley",
      lastName: "Williams",
      mobile: "737872387918",
      email: "ashley@gmail.com",
      receiving: false,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 6,
      firstName: "Ramsey",
      lastName: "Bolton",
      mobile: "34567890897654",
      email: "ramsey@gmail.com",
      receiving: true,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 7,
      firstName: "Leannah",
      lastName: "Smith",
      mobile: "7881479894891",
      email: "leannah@gmail.com",
      receiving: false,
      cardNumber: "",
      cardSerialNumber: "",
    },
    {
      id: 8,
      firstName: "Rosie",
      lastName: "Fox",
      mobile: "7634676893",
      email: "robbie@gmail.com",
      receiving: true,
      cardNumber: "",
      cardSerialNumber: "",
    },
  ]);

  // Function to assign card details to a member
  const assignCard = (memberId, cardNumber, cardSerialNumber) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId
          ? { ...member, cardNumber, cardSerialNumber }
          : member
      )
    );
  };

  return (
    <MembersContext.Provider value={{ members, assignCard }}>
      {children}
    </MembersContext.Provider>
  );
};

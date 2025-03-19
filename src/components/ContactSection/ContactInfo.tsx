import React from "react";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import ContactCard from "../cards/ContactCard";

const ContactInfo: React.FC = () => {
  // Array of contact card information
  const cardInfo = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone Number",
      content: "(242)813-6965",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      content: "support@example.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      content: "Nassau, bahamas",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      content: "Monday - Saturday 9 - 5",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 p-4">
      {cardInfo.map((card, index) => (
        <ContactCard
          key={index} // Unique key for each card
          icon={card.icon}
          title={card.title}
          content={card.content}
        />
      ))}
    </div>
  );
};

export default ContactInfo;

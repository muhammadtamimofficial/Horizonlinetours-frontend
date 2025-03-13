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
      content: "+017462343",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Address",
      content: "support@example.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      content: "123 Main Street, City, Country",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      content: "Mon - Fri: 9:00 AM - 5:00 PM",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
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

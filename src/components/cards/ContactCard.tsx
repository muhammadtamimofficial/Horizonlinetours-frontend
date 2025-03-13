import React from "react";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-3xl">{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default ContactCard;

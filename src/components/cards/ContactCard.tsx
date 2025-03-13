import React from "react";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 border-b-2 md:border-b-0 md:border-l-2 border-green-500 pb-2">
      <div className="text-2xl md:text-4xl text-blue-500">{icon}</div>
      <h3 className="text-xl md:text-3xl font-extralight">{title}</h3>
      <p className="text-xs md:text-xl">{content}</p>
    </div>
  );
};

export default ContactCard;

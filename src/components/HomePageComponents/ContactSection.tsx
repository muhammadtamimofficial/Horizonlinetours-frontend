import React from "react";
import ContactInfo from "../ContactSection/ContactInfo";
import ContactForm from "../ContactSection/ContactForm";
import SectionHeading from "../shared/SectionHeading";

const ContactSection = () => {
  return (
    <div>
      <SectionHeading title="Contact Us" />
      <div className="flex flex-col md:flex-row p-4 gap-2">
        {/* left side  */}
        <div className="w-full md:w-1/2">
          <div>
            <h1 className="text-3xl text-center bg-gray-400 p-2 mb-4">
              Get Touch With Us Now
            </h1>
          </div>
          <ContactInfo />
        </div>

        {/* right side  */}

        <div className="w-full md:w-1/2">
          <div>
            <h1 className="text-3xl text-center bg-gray-400 p-2 mb-4">
              Send A Message
            </h1>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

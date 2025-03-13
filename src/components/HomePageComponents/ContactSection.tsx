import React from "react";
import ContactInfo from "../ContactSection/ContactInfo";
import ContactForm from "../ContactSection/ContactForm";

const ContactSection = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl text-center my-8">Contact Us</h1>

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
              Get Touch With Us Now
            </h1>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;

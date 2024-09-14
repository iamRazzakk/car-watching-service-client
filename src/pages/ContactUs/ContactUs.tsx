import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import CInput from "../../components/Form/CInput";
import ILabel from "../../components/Form/ILabel";
import Button from "../../shared/Button/Button";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Simulate form submission
      console.log(formData);
      // Show success toast message
      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Show error toast message
      toast.error("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="mb-6">
            We would love to hear from you! Please use the form below to get in
            touch with us.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl mr-3" />
              <a
                href="mailto:mdabdurrazzakrakib290@gmail.com"
                className="text-lg"
              >
                mdabdurrazzakrakib290@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-2xl mr-3" />
              <a href="tel:+8801609502136" className="text-lg">
                +880 1609 502136
              </a>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl mr-3" />
              <address className="text-lg">Chittagong, Bangladesh</address>
            </div>
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <div className="space-y-4">
              <div>
                <ILabel htmlFor="name" label="Name" key={""}></ILabel>
                <CInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <ILabel htmlFor="email" label="Email"></ILabel>
                <CInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <ILabel htmlFor="message" label="Message"></ILabel>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={4}
                  required
                ></textarea>
              </div>
              <Button
                onClick={() => console.log("")}
                category="primary"
                text="Send message"
                type="button"
                className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              />
            </div>
            {status && <p className="mt-4 text-green-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

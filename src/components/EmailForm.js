import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useParams, useNavigate,useLocation } from "react-router-dom";

function EmailForm() {
  const location = useLocation();
  const { email } = useParams();
  const [formData, setFormData] = useState({ name:location.state?.name || "", email:location.state?.email || "", subject: "", message: "" });
  const navigate = useNavigate();
  

  useEffect(() => {
    emailjs.init("fmmtNKMJJvsAWx_Bq"); // Replace with your EmailJS user ID
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendMail = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const serviceID = "service_6wbkiqf";
    const templateID = "template_szwkcl9";

    emailjs
      .send(serviceID, templateID, { name, email, subject, message }, "fmmtNKMJJvsAWx_Bq")
      .then(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        alert("Your message was sent successfully!");
        updateEmailCount(email);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const updateEmailCount = (email) => {
    const emailCounts = JSON.parse(localStorage.getItem("emailCounts")) || {};
    if (emailCounts[email]) {
      emailCounts[email].count += 1;
    } else {
      emailCounts[email] = { name: formData.name, count: 1 };
    }
    localStorage.setItem("emailCounts", JSON.stringify(emailCounts));
  };

  return (
    <div className="container mx-auto p-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="p-5">
          <h1 className="text-3xl font-semibold mb-6 text-pink-400">Contact Form</h1>
          <form onSubmit={sendMail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg mb-2 text-purple-300">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg mb-2 text-purple-300">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-lg mb-2 text-purple-300">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg mb-2 text-purple-300">
                Message
              </label>
              <textarea
                className="w-full p-3 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                id="message"
                name="message"
                rows="4"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-2 rounded-lg shadow-lg hover:from-pink-500 hover:to-purple-500 transform transition-all duration-300 hover:scale-105"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="bg-gray-700 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-gray-600 transform transition-all duration-300 hover:scale-105"
              >
                Go to Dashboard
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-500 p-5   rounded-lg shadow-lg text-white">
          <h1 className="text-3xl font-semibold mb-4  text-pink-400">Email Preview</h1>
          <div className="mt-4">
            <h2 className="font-bold text-lg">To: {formData.email || "example@example.com"}</h2>
            <h2 className="font-bold text-lg">Subject: {formData.subject || "Your Message"}</h2>
            <div className="mt-2 text-gray-300">
              <p>{formData.message || "Message content will appear here."}</p>
            </div>
            <div className="mt-4 text-gray-400">
              <p>Best Regards,</p>
              <p>HR Shop Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailForm;

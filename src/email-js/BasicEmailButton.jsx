import React from "react";
import emailjs from "@emailjs/browser";

export default function BasicEmailButton() {
  function handleSendEmail() {
    const serviceId = ""; // Replace with your Service ID
    const templateId = ""; // Replace with your Template ID
    const publicKey = ""; // Replace with your Public Key

    const templateParams = {
      name: "John Doe", // Maps to {{name}}
      email: "john@example.com", // Maps to {{email}}
      message: "Hello! This is a test email sent using EmailJS.", // Maps to {{message}}
      title: "Test Email Button Inquiry", // Maps to {{title}}
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Success!", response.status, response.text);
        alert("Email sent successfully!");
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        alert("Failed to send email.");
      });
  }

  return (
    <button
      onClick={handleSendEmail}
      className="bg-black text-white p-2 border border-black rounded cursor-pointer"
    >
      Send Test Email
    </button>
  );
}

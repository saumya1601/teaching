import React from "react";
import emailjs from "@emailjs/browser";

export default function BasicEmailButton() {
  function handleSendEmail() {
    const templateParams = {
      from_name: "John Doe",
      from_email: "john@example.com",
      message: "Hello! This is a test email sent using EmailJS.",
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your Service ID
        "YOUR_TEMPLATE_ID", // Replace with your Template ID
        templateParams,
        "YOUR_PUBLIC_KEY" // Replace with your Public Key
      )
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

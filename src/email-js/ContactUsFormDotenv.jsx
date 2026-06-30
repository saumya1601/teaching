import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const ContactSchema = Yup.object().shape({
  from_name: Yup.string().required("Required"),
  from_email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

export default function ContactUsFormDotenv() {
  function handleSendMail(values, helpers) {
    const templateParams = {
      name: values.from_name,       // Maps to {{name}}
      email: values.from_email,     // Maps to {{email}}
      message: values.message,      // Maps to {{message}}
      title: "Dotenv Contact Form", // Maps to {{title}} in your subject line
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert("Message sent successfully!");
        helpers.resetForm();
      })
      .catch((error) => {
        console.error("Email error:", error);
        alert("Failed to send message.");
      });
  }

  return (
    <Formik
      initialValues={{ from_name: "", from_email: "", message: "" }}
      validationSchema={ContactSchema}
      onSubmit={handleSendMail}
    >
      <Form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <Field
            name="from_name"
            type="text"
            className="w-full border border-black p-2 rounded"
          />
          <ErrorMessage
            name="from_name"
            component="div"
            className="text-red-600 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Field
            name="from_email"
            type="email"
            className="w-full border border-black p-2 rounded"
          />
          <ErrorMessage
            name="from_email"
            component="div"
            className="text-red-600 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block mb-1">Message</label>
          <Field
            name="message"
            as="textarea"
            className="w-full border border-black p-2 rounded"
          />
          <ErrorMessage
            name="message"
            component="div"
            className="text-red-600 text-sm mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          Send Message
        </button>
      </Form>
    </Formik>
  );
}

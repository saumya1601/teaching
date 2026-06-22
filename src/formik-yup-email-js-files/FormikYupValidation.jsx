import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikYupValidation() {
  function BrokenForm() {
    return (
      <form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border border-black p-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          Submit
        </button>
      </form>
    );
  }

  function SimpleForm() {
    return (
      <Formik
        initialValues={{ username: "", email: "" }}
        onSubmit={(values) => {
          console.log("Submitted:", values);
        }}
      >
        <Form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
          <div>
            <label className="block mb-1">Username:</label>
            <Field
              name="username"
              type="text"
              className="w-full border border-black p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <Field
              name="email"
              type="email"
              className="w-full border border-black p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Submit
          </button>
        </Form>
      </Formik>
    );
  }

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    otp: Yup.string()
      .length(6, "Otp must be 6 digit")
      .required("Otp is required"),
  });

  function ValidationForm() {
    return (
      <Formik
        initialValues={{ username: "", email: "" }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Submitted:", values);
          resetForm(); 
        }}
      >
        <Form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
          <div>
            <label className="block mb-1">Username</label>
            <Field
              name="username"
              type="text"
              className="w-full border border-black p-2 rounded"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <Field
              name="email"
              type="email"
              className="w-full border border-black p-2 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block mb-1">Otp</label>
            <Field
              name="otp"
              type="text"
              className="w-full border border-black p-2 rounded"
            />
            <ErrorMessage
              name="otp"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Submit
          </button>
        </Form>
      </Formik>
    );
  }

  return (
    <div>
      <h1>broken form</h1>
      <BrokenForm />
      <h1>simple form</h1>
      <SimpleForm />
      <h1>validation form</h1>
      <ValidationForm />
    </div>
  );
}

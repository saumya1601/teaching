import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function FormikYupValidation() {
  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

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

  return (
    <div>
      <h1>broken form</h1>
      <BrokenForm />
      <h1>simple form</h1>
      <SimpleForm />
    </div>
  );
}

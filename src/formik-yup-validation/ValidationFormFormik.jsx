import React from "react";
import { Formik, Form, Field } from "formik";

export const ValidationFormFormik = () => {
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
};

import React from "react";
import { Formik, Form, Field } from "formik";

export default function FormikYupValidation() {
  function BrokenForm() {
    return (
      <form className="p-6 max-w-md mx-auto border border-gray-800 bg-[#0d1527] rounded-xl flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    );
  }

  //   function SimpleForm() {
  //     return (
  //       <Formik
  //         initialValues={{ username: "", email: "" }}
  //         onSubmit={(values) => {
  //           console.log("Submitted:", values);
  //         }}
  //       >
  //         <Form>
  //           <div>
  //             <label>Username:</label>
  //             <Field name="username" type="text" />
  //           </div>
  //           <div>
  //             <label>Email:</label>
  //             <Field name="email" type="email" />
  //           </div>
  //           <button type="submit">Submit</button>
  //         </Form>
  //       </Formik>
  //     );
  //   }

  return (
    <div>
      <BrokenForm />
      {/* <SimpleForm /> */}
    </div>
  );
}

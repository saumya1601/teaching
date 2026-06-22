import React from "react";
import { Formik, Form, Field } from "formik";

export default function FormikYupValidation() {
  //   function BrokenForm() {
  //     return (
  //       <form>
  //         <input type="text" placeholder="Username" />
  //         <button type="submit">Submit</button>
  //       </form>
  //     );
  //   }

  function SimpleForm() {
    return (
      <Formik
        initialValues={{ username: "", email: "" }}
        onSubmit={(values) => {
          console.log("Submitted:", values);
        }}
      >
        <Form>
          <div>
            <label>Username:</label>
            <Field name="username" type="text" />
          </div>
          <div>
            <label>Email:</label>
            <Field name="email" type="email" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );
  }

  return (
    <div>
      {/* <BrokenForm /> */}
      <SimpleForm />
    </div>
  );
}

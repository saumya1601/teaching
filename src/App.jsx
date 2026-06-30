import { BrokenForm } from "./formik-yup-validation/BrokenForm";
import { ValidationFormFormik } from "./formik-yup-validation/ValidationFormFormik";
import ValidationForm from "./formik-yup-validation/ValidationFormFormikAndYup";
import BasicEmailButton from "./email-js/BasicEmailButton";
import ContactUsForm from "./email-js/ContactUsForm";
import ContactUsFormDotenv from "./email-js/ContactUsFormDotenv";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {/* <BrokenForm /> */}
      {/* <ValidationFormFormik /> */}
      {/* <ValidationForm /> */}
      <BasicEmailButton />
      <ContactUsForm />
      {/* <ContactUsFormDotenv /> */}
    </div>
  );
}

export default App;

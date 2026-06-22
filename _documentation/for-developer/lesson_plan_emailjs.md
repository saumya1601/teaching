# ⏱️ The 60-Minute EmailJS Lesson Plan (React Integration)

This lesson plan is designed to teach students how to connect their front-end forms to a real email delivery service using **EmailJS**. Since students have already learned how to manage form state and validation with Formik and Yup, this lesson completes the loop by actually sending the form data to an inbox — with **no backend code required**.

---

## ⏱️ The 60-Minute Lesson Timeline

| Timebox | Phase | Key Focus |
| :--- | :--- | :--- |
| **00:00 - 05:00** | **Setup & Installation** | Install `@emailjs/browser` and prepare the workspace. |
| **05:00 - 15:00** | **Progression 1: Dashboard Setup** | Create an EmailJS account, connect Gmail, and set up a Template. |
| **15:00 - 25:00** | **Progression 2: Understanding the 3 Keys** | Locate and copy the Service ID, Template ID, and Public Key. |
| **25:00 - 38:00** | **Progression 3: Basic Send Integration** | Implement a simple `emailjs.send` function inside React. |
| **38:00 - 50:00** | **Progression 4: Formik Integration** | Connect EmailJS to the Formik `onSubmit` handler. |
| **50:00 - 57:00** | **Student Exercise** | Connect their Contact Form exercise from yesterday to their EmailJS template. |
| **57:00 - 60:00** | **Wrap-Up & Security** | Teach them about `.env` file structure to hide keys before pushing to GitHub. |

---

## 🧠 Pedagogical Rationale

* **Immediate Gratification (Dashboard to Inbox):** Showing students a real email arriving in their inbox from their code within the first 25 minutes of the class is a huge engagement booster.
* **Separating Account Setup from Code:** Guide them through the EmailJS dashboard together first. Do not start coding until every student has their three specific ID strings ready.
* **Formik Integration as the Climax:** Instead of writing complex forms from scratch, we build directly on the Formik forms they created in the last lesson. This shows them how libraries modularly plug into each other.

---

## 🛠️ Setup (5 min)

Install the modern browser SDK for EmailJS:

```bash
npm install @emailjs/browser
```

Verify that the local development server is running:

```bash
npm run dev
```

---

## 🧑‍🏫 Teaching Flow

### Progression 1: Dashboard Setup (10 min)

**Goal:** Understand the role of EmailJS and set up a free service account.

1. **Explain the architecture:** "Normally, sending an email requires a backend server (Node.js/Python) to securely call mail APIs. EmailJS sits between our front-end and mail servers, allowing us to send emails directly from the browser securely."
2. **Navigate & Register:** Have students go to [emailjs.com](https://www.emailjs.com) and create a free account.
3. **Add Service:** Add an email service (e.g., Personal Gmail). Name it and authorize it.
4. **Create Template:** 
   * Go to **Email Templates** and click "Create New Template".
   * Show them how the template placeholders work: `{{from_name}}`, `{{from_email}}`, and `{{message}}`.
   * Explain: **These names must match the keys we send in our React code.**

---

### Progression 2: The Three Keys (10 min)

**Goal:** Retrieve the credentials required to authenticate our client app.

Draw/Write a table on the board explaining the three values:

| Credential Name | Where to find it | What it does |
| :--- | :--- | :--- |
| **Service ID** | Email Services tab | Identifies which email account (e.g., Gmail) sends the message. |
| **Template ID** | Email Templates tab | Identifies the visual layout/subject format of the email. |
| **Public Key** | Account -> API Keys | Identifies your account to authorize the request (replaces old User ID). |

Have students copy these three values into a temporary text file.

---

### Progression 3: Basic Send Integration (13 min)

**Goal:** Write a simple JavaScript function to verify the credentials send an email successfully.

```jsx
import React from 'react';
import emailjs from '@emailjs/browser';

export default function BasicEmailButton() {
  function handleSendEmail() {
    const templateParams = {
      from_name: 'John Doe',
      from_email: 'john@example.com',
      message: 'Hello! This is a test email sent using EmailJS.',
    };

    emailjs.send(
      'YOUR_SERVICE_ID',     // Replace with your Service ID
      'YOUR_TEMPLATE_ID',    // Replace with your Template ID
      templateParams,
      'YOUR_PUBLIC_KEY'      // Replace with your Public Key
    )
    .then((response) => {
      console.log('Success!', response.status, response.text);
      alert('Email sent successfully!');
    })
    .catch((err) => {
      console.error('Failed to send email:', err);
      alert('Failed to send email.');
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
```

#### Concepts to Highlight

* **`emailjs.send()`**: The core function. It returns a **Promise**, which means we use `.then()` for success and `.catch()` for errors.
* **`templateParams`**: A standard JavaScript object. The keys inside must match the placeholder tags (`{{key}}`) we created in the EmailJS Template dashboard.

---

### Progression 4: Integrating with Formik (12 min)

**Goal:** Trigger the email submission inside Formik's `onSubmit` handler using form values.

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Required'),
});

export default function ContactUsForm() {
  function handleSendMail(values, { setSubmitting, resetForm }) {
    const templateParams = {
      from_name: values.fullName,
      from_email: values.email,
      message: values.message,
    };

    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      alert('Message sent successfully!');
      resetForm();
    })
    .catch((error) => {
      console.error('Email error:', error);
      alert('An error occurred. Please try again.');
    })
    .finally(() => {
      setSubmitting(false); // Re-enables the button
    });
  }

  return (
    <Formik
      initialValues={{ fullName: '', email: '', message: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSendMail}
    >
      {({ isSubmitting }) => (
        <Form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <Field 
              name="fullName" 
              type="text" 
              className="w-full border border-black p-2 rounded" 
            />
            <ErrorMessage name="fullName" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <Field 
              name="email" 
              type="email" 
              className="w-full border border-black p-2 rounded" 
            />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <div>
            <label className="block mb-1">Message</label>
            <Field 
              name="message" 
              as="textarea" 
              className="w-full border border-black p-2 rounded" 
            />
            <ErrorMessage name="message" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
```

#### Concepts to Highlight

* **Mapping Form Values**: Emphasize how `values.fullName` maps into the parameters object.
* **`finally()` Block**: We place `setSubmitting(false)` in a `.finally()` or at the end of resolution so the form submission state resets whether the email succeeds or fails.
* **Visual Loading**: Discuss how `isSubmitting` disables the button and updates the text to `"Sending..."` while the HTTP request resolves.

---

### Progression 5: Environment Variables (8 min)

**Goal:** Introduce security best practices by hiding keys in a `.env` file before pushing to GitHub.

Explain: "If you push your Public Key or Template IDs directly to GitHub, bad actors can scan your code and use your email limits. We use environment variables to hide them locally."

1. Create a `.env` file in the root of the project:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
2. Reference them in code:
   ```javascript
   emailjs.send(
     import.meta.env.VITE_EMAILJS_SERVICE_ID,
     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
     templateParams,
     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
   )
   ```
3. Remind them to add `.env` to their `.gitignore`!

---

## 🏋️ Student Exercise (7 min)

**Task:** Connect the "Course Feedback Form" (Exercise 3 from yesterday) to EmailJS.
* When students submit the form, it must send the Course Name, Student Name, Age, and Comments via EmailJS to their connected inbox.
* The submit button must show `"Submitting..."` and be disabled during the send process.
* The form must clear itself only if the send succeeds.

---

## ⚠️ Common Mistakes Quick Reference

| Mistake | Symptom | Fix |
| :--- | :--- | :--- |
| Typo in template param keys | Email arrives empty or missing details | Ensure keys in code parameters match `{{tag}}` in template exactly. |
| Forgetting `setSubmitting(false)` | Button remains disabled forever after send | Call `setSubmitting(false)` inside `.finally()` or resolved promises. |
| Pushing `.env` to Git | Credentials exposed to public | Double-check that `.env` is listed inside your `.gitignore` file. |
| Missing email permission authentication | Browser console shows 400 unauthorized error | Go to EmailJS Dashboard and make sure the service is authorized. |

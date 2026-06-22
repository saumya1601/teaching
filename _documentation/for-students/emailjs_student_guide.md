# 🚀 Student Guide: Sending Emails from React with EmailJS

Welcome! This guide will teach you how to send emails directly from your React application using **EmailJS**. You will learn how to connect your input forms (including those built with Formik and Yup) to a real email delivery service, allowing submissions to land directly in your inbox — **without needing to build a backend server**.

---

## 🔄 How EmailJS Works

Normally, sending an email from a website requires a server to run SMTP code. EmailJS acts as a helper service:

```
[React Form] ➔ [EmailJS SDK] ➔ [EmailJS Server] ➔ [Your Inbox (Gmail, Outlook, etc.)]
```

It securely delivers your form data as formatted emails based on customizable templates.

---

## 🛠️ Step 1: Account & Service Setup

Before writing code, you need to set up your account and template credentials:

1. **Sign Up:** Go to [emailjs.com](https://www.emailjs.com) and create a free account.
2. **Connect Service:** Navigate to the **Email Services** tab, click **Add Service**, select your email provider (e.g., Gmail), and authorize it. Note down the **Service ID** generated.
3. **Create Template:**
   * Go to **Email Templates** and click **Create New Template**.
   * Write your subject and email content. Use double curly braces `{{tag}}` as placeholders for dynamic inputs (e.g., `{{from_name}}`, `{{from_email}}`, `{{message}}`).
   * Save the template and note down the **Template ID**.
4. **Get API Key:** Navigate to **Account** ➔ **API Keys** and copy your **Public Key** (previously known as User ID).

---

## 📦 Step 2: Install the Package

In your project terminal, install the official EmailJS browser SDK:

```bash
npm install @emailjs/browser
```

---

## 💻 Step-by-Step Code Examples

### Example 1: Basic Email Button (Simple Send)

This example shows how to send a hardcoded email block to test if your credentials work.

```jsx
import React from 'react';
import emailjs from '@emailjs/browser';

export default function TestEmailButton() {
  function sendTestEmail() {
    const templateParams = {
      from_name: 'Jane Doe',
      from_email: 'jane@example.com',
      message: 'This is a test message to confirm EmailJS is working!',
    };

    emailjs.send(
      'YOUR_SERVICE_ID',   // Replace with your Service ID
      'YOUR_TEMPLATE_ID',  // Replace with your Template ID
      templateParams,
      'YOUR_PUBLIC_KEY'    // Replace with your Public Key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Email sent successfully!');
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert('Email failed to send.');
    });
  }

  return (
    <button 
      onClick={sendTestEmail} 
      className="bg-black text-white p-2 border border-black rounded cursor-pointer"
    >
      Send Test Email
    </button>
  );
}
```

---

### Example 2: Integrating with Formik & Yup

Now, let's connect EmailJS to a Formik form to send whatever the user types.

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

export default function ContactForm() {
  function handleSubmitMail(values, { setSubmitting, resetForm }) {
    // Map Formik values to template placeholders
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
      alert('Message sent to inbox successfully!');
      resetForm(); // Clear inputs on success
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      alert('Submission failed, please try again.');
    })
    .finally(() => {
      setSubmitting(false); // Enable the submit button again
    });
  }

  return (
    <Formik
      initialValues={{ fullName: '', email: '', message: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmitMail}
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
              rows={4}
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

---

## 🔒 Step 3: Security & Environment Variables

Never push your raw API keys or IDs to public GitHub repositories! 

### How to Hide Your Keys:

1. **Create a `.env` file** in the root directory of your project (same folder as `package.json`).
2. Add your keys starting with `VITE_`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
   ```
3. Use `import.meta.env` to load them in your code:
   ```javascript
   emailjs.send(
     import.meta.env.VITE_EMAILJS_SERVICE_ID,
     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
     templateParams,
     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
   )
   ```
4. **Important:** Add `.env` to your `.gitignore` file so it is not committed to GitHub.

---

## 🚨 Troubleshooting Checklist

* **Email arrives empty?** Check your parameter object keys (e.g., `from_name`). They must match the template double-bracket keys (`{{from_name}}`) exactly, case-sensitively.
* **Console displays `400 Unauthorized` error?** Check that your Public Key matches your dashboard API keys and is passed correctly as the 4th parameter of `emailjs.send()`.
* **Submit button stays disabled?** Make sure you called `setSubmitting(false)` in your `.then()`, `.catch()`, or `.finally()` block so the form react-enables.
* **Build error with variables?** Ensure your environment keys start with `VITE_` (for Vite setups) or `REACT_APP_` (for Create React App setups).

---

## 🏋️ Practice Exercises

Complete the following exercises to build confidence integrating email systems:

---

### 🟢 Exercise 1 (Easy): Quick Feedback Button
Create a page with a simple text input and a button. When clicked, it sends a single line of quick feedback (e.g. *"Great course!"*) to your email without any validation.

---

### 🟡 Exercise 2 (Medium): Event Signup Form
Build a sign-up form for a seminar.

#### Exercise 2: Fields & Validation Rules
* `attendeeName` (Required, text)
* `email` (Required, email)
* `tickets` (Required, select options: 1 ticket, 2 tickets, 3 tickets)

#### Exercise 2: Requirements
1. Render error messages underneath fields when they are touched and invalid.
2. Link the inputs to your EmailJS Template.
3. Show an alert indicating *"Successfully registered, ticket details sent to inbox!"* on resolution.
4. Clear form values on success.

---

### 🔴 Exercise 3 (Hard): Comprehensive Bug Report Form
Build a ticket submission system for developers.

#### Exercise 3: Fields & Validation Rules
* `reporterName` (Required, text)
* `email` (Required, email)
* `bugSeverity` (Required, select dropdown: low, medium, critical)
* `description` (Required, minimum 15 characters, textarea)

#### Exercise 3: Requirements
1. Form validation errors must appear in red text.
2. The form submission button must disable and show `"Sending Ticket..."` while sending.
3. Secure the credentials using a `.env` file.
4. Log the API response to the console, reset inputs, and re-enable the button once submission succeeds or fails.

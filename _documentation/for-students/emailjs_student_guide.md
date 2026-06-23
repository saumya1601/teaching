# 🚀 Student Guide: Sending Emails from React with EmailJS

Welcome! This step-by-step guide will teach you how to send emails directly from your React application using **EmailJS**.

You will learn how to connect your HTML/React forms (both basic forms and forms built with validation libraries like Formik and Yup) to a real email delivery service. This allows form submissions to land directly in your email inbox — **without needing to build or manage a backend server**.

---

## 🔄 How EmailJS Works

Normally, sending an email from a website requires a backend server to run secure email code (SMTP). EmailJS acts as a helper service that bridges your frontend and your inbox:

```
[React Form] ➔ [EmailJS SDK] ➔ [EmailJS Server] ➔ [Your Inbox (Gmail, Outlook, etc.)]
```

It securely delivers your form data as formatted emails based on customizable email templates you create on their website.

---

## 🛠️ Step 1: Set Up Your EmailJS Account

Before writing any code, you need to sign up for EmailJS and create your service, email template, and API keys.

### 1. Sign Up
Go to [emailjs.com](https://www.emailjs.com) and create a free account.

### 2. Connect Your Email Service
* Navigate to the **Email Services** tab in your dashboard.
* Click **Add Service**, select your email provider (like Gmail, Outlook, etc.).
* Connect and authorize your account.
* Note down your **Service ID** (e.g., `service_ab12cd3`).

### 3. Create Your Email Template
* Navigate to the **Email Templates** tab and click **Create New Template**.
* Design the subject line and content of your email.
* Use double curly braces `{{variable_name}}` as placeholders for dynamic inputs from your React form. For example:
  ```text
  You received a new message from {{from_name}} ({{from_email}}):
  
  {{message}}
  ```
* Save the template and note down your **Template ID** (e.g., `template_xyz987`).

### 4. Get Your Public API Key
* Navigate to **Account** ➔ **API Keys** in the sidebar.
* Copy your **Public Key** (which acts as your credential to connect the React app to your account).

---

## 📦 Step 2: Install the EmailJS Package

In your project terminal, run the following command to install the official EmailJS browser library:

```bash
npm install @emailjs/browser
```

---

## 💻 Step 3: Send a Simple Email (Basic Form Component)

Here is the easiest way to send an email in React. We will use a standard HTML form, standard browser validation, and EmailJS's `sendForm` method.

In this approach, EmailJS automatically reads the value of each input field based on its `name` attribute.

```jsx
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function BasicContactForm() {
  const formRef = useRef();

  const handleSendEmail = (e) => {
    e.preventDefault(); // Stop standard browser page reload

    emailjs.sendForm(
      'YOUR_SERVICE_ID',   // Replace with your Service ID
      'YOUR_TEMPLATE_ID',  // Replace with your Template ID
      formRef.current,     // The HTML form element reference
      'YOUR_PUBLIC_KEY'    // Replace with your Public Key
    )
    .then((result) => {
      console.log('Success:', result.text);
      alert('Email sent successfully!');
      e.target.reset(); // Clear the input fields
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    });
  };

  return (
    <div className="form-container">
      <h2>Contact Us</h2>
      
      <form ref={formRef} onSubmit={handleSendEmail} className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
        
        {/* Name Input */}
        <div className="input-group">
          <label className="block mb-1">Name</label>
          <input 
            type="text" 
            name="from_name" // Must match template placeholder {{from_name}}
            required 
            className="w-full border border-black p-2 rounded" 
          />
        </div>

        {/* Email Input */}
        <div className="input-group">
          <label className="block mb-1">Email Address</label>
          <input 
            type="email" 
            name="from_email" // Must match template placeholder {{from_email}}
            required 
            className="w-full border border-black p-2 rounded" 
          />
        </div>

        {/* Message Textarea */}
        <div className="input-group">
          <label className="block mb-1">Message</label>
          <textarea 
            name="message" // Must match template placeholder {{message}}
            required 
            rows={4}
            className="w-full border border-black p-2 rounded" 
          />
        </div>

        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">
          Send Message
        </button>
      </form>
    </div>
  );
}
```

---

## 🚀 Step 4: Integrate with Formik & Yup (For Production Apps)

For real-world projects, you will want custom error messages and validation. Here is how to integrate EmailJS with a React form managed by **Formik** and **Yup**:

By naming our Formik input fields to match our EmailJS template placeholder names (`from_name`, `from_email`, `message`), we can pass the form `values` directly without doing any manual object mapping!

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

// 1. Define schema validation rules (keys match template fields)
const ContactSchema = Yup.object().shape({
  from_name: Yup.string().required('Name is required'),
  from_email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

export default function FormikContactForm() {
  const handleSubmitMail = (values, helpers) => {
    // 2. Send directly using emailjs.send with form values
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      values, // Pass values directly! No templateParams object needed.
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      alert('Message sent to inbox successfully!');
      helpers.resetForm(); // Clear the form fields on success
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      alert('Submission failed, please try again.');
    });
  };

  return (
    <Formik
      initialValues={{ from_name: '', from_email: '', message: '' }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmitMail}
    >
      <Form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <Field 
            name="from_name" 
            type="text" 
            className="w-full border border-black p-2 rounded" 
          />
          <ErrorMessage name="from_name" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Field 
            name="from_email" 
            type="email" 
            className="w-full border border-black p-2 rounded" 
          />
          <ErrorMessage name="from_email" component="div" className="text-red-600 text-sm mt-1" />
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
          className="bg-black text-white p-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          Send Message
        </button>
      </Form>
    </Formik>
  );
}
```

---

## 🔒 Step 5: Secure Your Keys with Environment Variables (`.env`)

Never hardcode your Service ID, Template ID, or Public Key in your code! If you commit raw keys to GitHub, bots can steal them and spam your email service.

Follow these steps to hide them safely:

### 1. Create a `.env` file
Create a file named `.env` in the absolute root folder of your project (same level as `package.json` and `src/`).

### 2. Define your variables
Open `.env` and paste your credentials. If you are using **Vite**, prefix variables with `VITE_`:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

> [!NOTE]
> If you are using standard **Create React App** (CRA) instead of Vite, use the `REACT_APP_` prefix instead:
> `REACT_APP_EMAILJS_SERVICE_ID=...`

### 3. Load variables in your code
Update your EmailJS function call to reference the environment variables:

```javascript
// For Vite projects:
emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  values, // Pass values directly!
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)

// For Create React App (CRA) projects:
emailjs.send(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  values, // Pass values directly!
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
)
```

### 4. Update `.gitignore`
Make sure your `.env` file is added to your `.gitignore` file. This prevents Git from uploading it to GitHub.

---

## 🚨 Troubleshooting Checklist

If your emails aren't arriving or you see errors, check this list:

* **Email arrives empty or missing details?** Check that your parameters (like `from_name`, `from_email`) match the double-curly bracket placeholders (`{{from_name}}`, `{{from_email}}`) in your dashboard template EXACTLY, including matching uppercase and lowercase letters.
* **Got a `400 Unauthorized` error in the console?** Check that your Public Key matches your dashboard API keys and is passed correctly as the 4th parameter of `emailjs.send()` or `emailjs.sendForm()`.
* **Submit button stays disabled?** (Only if you chose to add a loading state) Make sure you called `helpers.setSubmitting(false)` in your `.then()` and `.catch()` blocks so the form react-enables.
* **Environment variables are undefined?** Whenever you edit the `.env` file, you **must stop your local development server and restart it** (e.g., run `npm run dev` again) for the changes to load.

---

## 🏋️ Practice Exercises

### 🟢 Exercise 1 (Easy): Send Simple Feedback
Create a page with a simple text area and a "Send Feedback" button. Link it to EmailJS using the basic uncontrolled component pattern (Step 3). When clicked, send the text feedback to your inbox.

### 🟡 Exercise 2 (Medium): Event RSVP Form
Build a simple RSVP form for a webinar:
* Fields: `attendeeName`, `email`, `dietaryRequirements` (select dropdown).
* Validation: Make name and email required using Formik & Yup.
* Action: Deliver the form submission to your inbox and clear inputs on success.

### 🔴 Exercise 3 (Hard): Bug Report Form
Build a ticket submission form:
* Fields: `from_name`, `from_email`, `message` (textarea with a 15-character minimum).
* Security: Protect all EmailJS credentials using environment variables (`.env`).
* Integration: Send the form data directly to your connected inbox and clear the inputs upon successful submission.

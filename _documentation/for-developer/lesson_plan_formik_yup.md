# ⏱️ The 60-Minute Formik & Yup Lesson Plan (Hook-Free Version)

This lesson plan is designed for students who **have not yet learned React Hooks**. By utilizing Formik's declarative components (`<Formik>`, `<Form>`, `<Field>`, and `<ErrorMessage>`), students will learn clean form state management and schema validation without writing custom state logic or event handlers.

---

## ⏱️ The 60-Minute Lesson Timeline

| Timebox | Phase | Key Focus |
| :--- | :--- | :--- |
| **00:00 - 05:00** | **Setup & Installation** | Install `formik` and `yup` and prepare a blank slate. |
| **05:00 - 12:00** | **Progression 1: The Form Challenge** | Demonstrate standard HTML form reload. Introduce Formik as the "state manager" for our SPA. |
| **12:00 - 24:00** | **Progression 2: Core Components** | Write `<Formik>`, `<Form>`, and `<Field>`. Emphasize matching the `name` attribute to `initialValues`. |
| **24:00 - 34:00** | **Progression 3: Yup Schema** | Build a `Yup.object()` schema separately. Connect it to `validationSchema`. |
| **34:00 - 42:00** | **Progression 4: Error Handling** | Introduce `<ErrorMessage>` and explain the concept of the `touched` state. |
| **42:00 - 50:00** | **Progression 5: Real-World Patterns** | Form resetting, rendering Textareas/Select fields, and handling async submissions. |
| **50:00 - 57:00** | **Student Exercise** | A hands-on, 7-minute coding exercise building a validated contact form. |
| **57:00 - 60:00** | **Wrap-Up & Q&A** | Connect today's concepts to future React Hooks topics (`useFormik`). |

---

## 🧠 Pedagogical Rationale

* **Front-Loading the Paradigm Shift (Minutes 12 to 24):** Transitioning from manual input handlers to `<Field />` requires the biggest mental leap for beginners. Dedicating 12 minutes here ensures they fully grasp how Formik implicitly links state via the `name` attribute before layering on validation.
* **Isolating Yup (Minutes 24 to 34):** Teaching Yup separately from React components helps avoid syntax fatigue. By establishing the schema as a plain JavaScript object first, it becomes much easier to understand how it plugs into Formik's `validationSchema` prop.
* **The "Aha!" Moment (Minutes 34 to 42):** `<ErrorMessage>` is where students realize the value of this library. This section demonstrates how much conditional rendering logic they just avoided writing.
* **Deferring Advanced Complexity (Async & Hooks):** Since students do not know hooks, advanced states (like disabling buttons via `isSubmitting` render props) are flagged as a future topic to avoid overloading them.

---

## 🛠️ Setup (5 min)

Before teaching, ensure students run the following commands in their terminal:

```bash
npm install formik yup
npm run dev
```

Then, delete the contents of `App.jsx` and `index.css` (or styles that might conflict) so students start with a clean slate.

---

## 🧑‍🏫 Teaching Flow

### Progression 1: The HTML Form Problem (7 min)

**Goal:** Make the problem visible, not just described.

**Live demo first (2 min):** Create a plain HTML form in a React component and click submit. Students watch the page reload and lose all state.

```jsx
// Show this first — watch the page reload on submit!
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
```

**Then ask the class:**

* *"Where did the data go when we submitted?"* (Nowhere useful — the browser handled it the old way)
* *"What would we need to write ourselves to capture it?"* (Event handlers, state, `preventDefault`... it adds up fast)

**Introduce Formik:**

> [!NOTE]
> "Instead of wiring all of that ourselves, `<Formik>` is a specialized container component that captures, manages, and validates our form data — all through props."

---

### Progression 2: The `<Formik>` Component (12 min)

**Goal:** Show how to declare a form's initial data structure and handle submission.

```jsx
import { Formik, Form, Field } from 'formik';

function SimpleForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '' }}
      onSubmit={(values) => {
        console.log('Submitted:', values);
      }}
    >
      <Form className="p-6 max-w-md mx-auto border border-gray-800 bg-[#0d1527] rounded-xl flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-gray-200">Username:</label>
          <Field 
            name="username" 
            type="text" 
            className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white" 
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-200">Email:</label>
          <Field 
            name="email" 
            type="email" 
            className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white" 
          />
        </div>
        <button 
          type="submit" 
          className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
}
```

#### Concepts to Highlight

* **`<Formik>`** — The parent wrapper. `initialValues` defines the field names and their starting values.
* **`<Form>`** — Replaces the standard `<form>` tag. It automatically prevents the default page reload, and only calls `onSubmit` after all validation passes.
* **`<Field>`** — Replaces `<input>`. The `name` prop is the link to Formik's state. It must exactly match a key in `initialValues`. No `onChange`, no `value` prop, no manual event handlers needed.

> [!WARNING]
> **Common Mistake #1 — The Silent Name Mismatch**
>
> If the `name` attribute on a `<Field>` doesn't match a key in `initialValues`, the field is silently disconnected from Formik's state.
>
> ```jsx
> // initialValues has "username"
> initialValues={{ username: '' }}
>
> <Field name="userName" />  // ❌ Wrong — breaks silently due to capital 'N'
> <Field name="username" />  // ✅ Correct
> ```

---

### Progression 3: Yup Validation Schema (10 min)

**Goal:** Define validation rules declaratively using Yup, and connect them to the `<Formik>` component.

```javascript
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});
```

**Explain the structure**

* `Yup.object().shape({})` — wraps the whole form. Each key maps to a field in `initialValues`.
* `Yup.string()` — declares the expected data type for that field.
* `.required()`, `.min()`, `.email()` — chainable rules. The string argument inside each is the custom error message.

Pass the schema to `<Formik>` via the `validationSchema` prop:

```jsx
<Formik
  initialValues={{ username: '', email: '' }}
  validationSchema={RegisterSchema}
  onSubmit={(values) => console.log('Submitted:', values)}
>
  {/* Form goes here */}
</Formik>
```

> [!TIP]
> **Timing Note:** Yup runs validation on blur (when the user leaves a field) and on submit. Errors will not appear while typing — only after the user leaves a field or attempts to submit. This is standard UX behavior to avoid annoying the user while they type.

---

### Progression 4: Displaying Errors Automatically (8 min)

**Goal:** Show validation errors under each input using `<ErrorMessage>`.

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too short').required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function App() {
  return (
    <Formik
      initialValues={{ username: '', email: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => console.log('Submitted:', values)}
    >
      <Form className="p-6 max-w-md mx-auto border border-gray-800 bg-[#0d1527] rounded-xl flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-gray-200">Username</label>
          <Field 
            name="username" 
            type="text" 
            className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white" 
          />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label className="block mb-1 text-gray-200">Email</label>
          <Field 
            name="email" 
            type="email" 
            className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white" 
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <button 
          type="submit" 
          className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700"
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
}
```

#### Concepts to Highlight

* **"Touched" State:** Represents if the user has focused and unfocused the input field. Errors only show up *after* a field is touched.
* **`component="div"`** — tells `<ErrorMessage>` what HTML element to wrap the error text in. Without it, it renders a plain string with no wrapping element.

> [!WARNING]
> **Common Mistake #2 — Missing `component` on `<ErrorMessage>`**
>
> ```jsx
> // No component prop — renders a plain string, className has no effect:
> <ErrorMessage name="username" className="text-red-500" />  // ❌
> 
> // With component prop — renders a <div>, className works:
> <ErrorMessage name="username" component="div" className="text-red-500" />  // ✅
> ```

---

### Progression 5: Real-World Patterns (8 min)

**Goal:** Cover three patterns students will need immediately in real projects.

#### Pattern A: Resetting the Form After Submit

After a successful submission, the form fields stay populated. Clear them using `resetForm()` from the second argument of `onSubmit` (`formikHelpers`):

```jsx
<Formik
  initialValues={{ username: '', email: '' }}
  validationSchema={RegisterSchema}
  onSubmit={(values, { resetForm }) => {
    console.log('Submitted:', values);
    resetForm(); // Clears all fields back to initialValues
  }}
>
```

#### Pattern B: Using `<Field>` for Textarea and Select

`<Field>` is not limited to text inputs. Use the `as` prop to render other HTML elements:

```jsx
{/* Textarea */}
<Field 
  name="bio" 
  as="textarea" 
  rows={4} 
  className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white" 
/>
<ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />

{/* Select dropdown */}
<Field 
  name="role" 
  as="select" 
  className="w-full p-2 bg-[#16223f] border border-gray-700 rounded text-white"
>
  <option value="">Select a role...</option>
  <option value="student">Student</option>
  <option value="teacher">Teacher</option>
</Field>
<ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
```

#### Pattern C: Disabling Submit During Async Processing

When `onSubmit` makes an API call, the button should be disabled to prevent double-submissions. Use `setSubmitting` from `formikHelpers`:

```jsx
<Formik
  initialValues={{ username: '', email: '' }}
  onSubmit={async (values, { setSubmitting, resetForm }) => {
    await someApiCall(values); // your API call here
    resetForm();
    setSubmitting(false); // re-enables the submit button when done
  }}
>
```

---

## 🏋️ Student Exercise (7 min)

**Task:** Build a contact form with the following requirements entirely from scratch:

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `fullName` | text | Required, minimum 2 characters |
| `email` | email | Required, valid email format |
| `message` | textarea | Required, minimum 10 characters |

**Requirements**

1. Show an error under each field when it is touched and invalid.
2. Log the submitted values to the console on submit.
3. Reset the form after successful submission.
4. Use `<Field as="textarea">` for the message field.

**Starter code**

```jsx
const initialValues = {
  fullName: '',
  email: '',
  message: '',
};
```

---

## ⚠️ Common Mistakes Quick Reference

| Mistake | Symptom | Fix |
| :--- | :--- | :--- |
| `Field name` doesn't match `initialValues` key | Field doesn't update; silent failure | Exact string match required — typos break silently |
| Missing `component` on `<ErrorMessage>` | CSS classes/styles have no effect | Add `component="div"` |
| Expecting `onSubmit` to fire despite errors | `onSubmit` never runs | `<Form>` gates submission behind validation |
| Form fields stay populated after submit | Form doesn't reset | Call `resetForm()` from `formikHelpers` |
| Errors not showing while typing | Students think validation is broken | Explain "touched" = the blur event, not keypress |
| Using `alert()` instead of `console.log` | Hides the actual values object | Use `console.log` in teaching; show the object |

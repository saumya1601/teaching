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
  function ValidationForm() {
    return (
      <Formik
        initialValues={{ username: '', email: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => console.log('Submitted:', values)}
      >
        <Form className="border border-black p-4 rounded max-w-md mx-auto flex flex-col gap-4">
          <div>
            <label className="block mb-1">Username</label>
            <Field 
              name="username" 
              type="text" 
              className="w-full border border-black p-2 rounded" 
            />
            <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
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
  className="w-full border border-black p-2 rounded" 
/>
<ErrorMessage name="bio" component="div" className="text-red-600 text-sm mt-1" />

{/* Select dropdown */}
<Field 
  name="role" 
  as="select" 
  className="w-full border border-black p-2 rounded"
>
  <option value="">Select a role...</option>
  <option value="student">Student</option>
  <option value="teacher">Teacher</option>
</Field>
<ErrorMessage name="role" component="div" className="text-red-600 text-sm mt-1" />
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

---

## 🗣️ Teacher's Explanation Script (How to Explain Each Part)

Use this script and these analogies during your lecture to help students digest complex form concepts easily.

### The Big Picture Analogy: "The Passport Office Form"

Before writing code, explain this analogy on the board:

> "Imagine you go to a passport office. They hand you a paper application form with empty fields: **Full Name**, **Email**, and **Message**. You fill it out. If you leave a required box blank, the clerk marks it with a red pen and says, 'Fix this before you submit.'
>
> * **`<Formik>`** is the **Passport Clerk** who hands you the form and keeps track of what you write.
> * **`initialValues`** are the **blank boxes** printed on the paper when you first get it.
> * **`<Field>`** is **each individual box** you write in.
> * **`Yup Schema`** is the **clerk’s checklist** (e.g., 'Name must be at least 3 letters', 'Email must have an @ symbol').
> * **`<ErrorMessage>`** is the **red pen correction** the clerk writes next to the box if you make a mistake."

---

### Step-by-Step Lecture Guide

#### 1. Explaining the HTML Form Problem (Progression 1)

* **What to say:**
  > "In regular HTML, when you click submit inside a form, the browser’s default behavior is to reload the entire page. In a React Single Page Application (SPA), this is a disaster because a page reload wipes out React's memory (state). Let's see this issue live."
* **What to show:** Run the simple HTML form, type a username, hit submit, and point out how the input clears immediately because of the page reload.

#### 2. Explaining `<Formik>`, `<Form>`, and `<Field>` (Progression 2)

* **What to say:**
  > "To avoid managing state manually (`useState`) for every single field, Formik acts as our centralized state manager."
* **Concept breakdown:**
  * **`initialValues`**: *"Think of this as the starting state. We must declare every field here first, even if it's just an empty string: `{ username: '', email: '' }`."*
  * **`<Formik>`**: *"The brain. It's a parent component that manages the form's state and submits the values, but does not render any visual UI itself."*
  * **`<Form>`**: *"Replaces the HTML `<form>` tag. Behind the scenes, it automatically calls `event.preventDefault()` to stop the page from reloading."*
  * **`<Field>`**: *"Replaces the standard HTML `<input>`. Notice we don't write `onChange` or `value` props anymore! Formik links this input to the state using the `name` prop. The `name` must exactly match the key in `initialValues`."*

#### 3. Explaining Yup Validation Schema (Progression 3)

* **What to say:**
  > "Right now, we can submit an empty form. Instead of writing a bunch of tedious `if/else` checks, we use a tool called **Yup** to build a declarative validation checklist."
* **Concept breakdown:**
  * **`Yup.object().shape`**: *"We are validating a form object. Its keys must match our `initialValues`."*
  * **`Yup.string().min(3, 'Error msg')`**: *"A rule chain. It must be text, at least 3 characters long, or else it displays our custom error message."*
  * **`validationSchema={RegisterSchema}`**: *"We pass the checklist to `<Formik>`. Formik will now automatically run these rules on the fields."*

#### 4. Explaining `<ErrorMessage>` and the "Touched" Concept (Progression 4)

* **What to say:**
  > "To display our error messages on the screen, we use `<ErrorMessage name="username" component="div" />`. It displays the error text from our Yup checklist under the matching field."
* **Concept breakdown:**
  * **The "Touched" State:** *"Why don't errors show up immediately when the page loads? That would be a terrible user experience! If you open a login page and it's already red with errors before you even type, you'd get annoyed. Formik tracks the `touched` state—which means the user has clicked inside the field and then clicked out (blur event). Errors only show after a field is touched."*
  * **The `component` Prop:** *"We pass `component="div"` to tell Formik to render the error inside a `<div>` element so we can style it with CSS."*

---

### 🌟 Teacher's Golden Rules for Reference

Write these three rules on the board for your students:

1. **The Name Rule:** The `name` prop on your `<Field>` and `<ErrorMessage>` must **exactly** match the keys in your `initialValues` and your `validationSchema`.
2. **The Error Component Rule:** Always include `component="div"` on `<ErrorMessage>` so you can style it with CSS classes.
3. **The Submission Rule:** The `onSubmit` function will **never** trigger if there are active validation errors. Formik automatically prevents submissions when the form is invalid.

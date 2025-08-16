# Expense Tracker

A modern expense tracking application built with React and TypeScript that helps users manage their finances efficiently.

## Please Login before doing any action on Expense section.

Because for Expense Route - Create, Update and Delete operations are protected by the checkAuth middleware.

- You must be logged in to perform these actions.

- A valid JWT access token is required, which is set in cookies after login.

- If no token is provided or the token is invalid, those operations will not execute

```python
router.post(
  "/create-expense",
  validateRequest(createExpenseSchema),
  checkAuth(),
  ExpenseControllers.createExpense
);
```

```python
router.patch(
  "/update-expense/:id",
  checkAuth(),
  ExpenseControllers.updateExpense
);
```
```python
router.delete(
  "/remove-expense/:id",
  checkAuth(),
  ExpenseControllers.deleteExpense
);

```

# Features

- User Authentication: JWT-based secure login and registration

- Expense Management: Add, edit, delete, and categorize expenses

- Data Visualization: Interactive charts for spending analysis

- Responsive Design: Works on all device sizes

---

## **Technologies Used**

- **Technologies Used:** React 19 with TypeScript
- **Styling:** Tailwind CSS with ShadCN UI components
- **State Management:** Redux Toolkit (RTK Query)
- **Routing:** React Router
- **HTTP Client:** Axios

## Key Libraries

- **UI Components**: ShadCN + Origin UI design system
- **Charts**: Recharts for data visualization
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: JWT validation with secure storage

## Authentication Flow

JWT tokens are securely stored and validated with each request. The authentication flow includes:

- Login/Registration
- Automatic logout on token expiration

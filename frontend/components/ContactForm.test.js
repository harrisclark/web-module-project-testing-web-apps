import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  render(<ContactForm />);

  const header = screen.getByText(/contact form/i);
  console.log(header);
  expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name\*/i);
  userEvent.type(firstNameInput, 'four');

  const errorMessage1 = screen.getByText(/error: firstName/i);
  
  expect(errorMessage1).toBeInTheDocument();


});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const err1 = screen.getByText(/error: firstname/i);
  const err2 = screen.getByText(/error: lastname/i);
  const err3 = screen.getByText(/error: email/i);

  expect(err1).toBeInTheDocument();
  expect(err2).toBeInTheDocument();
  expect(err3).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name\*/i);
  const lastNameInput = screen.getByLabelText(/last name\*/i);
  const submitButton = screen.getByRole('button');

  userEvent.type(firstNameInput, 'chris');
  userEvent.type(lastNameInput, 'dude');
  userEvent.click(submitButton);

  const err = screen.getByText(/error: email/i);
  expect(err).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email\*/i);

  userEvent.type(emailInput, 'invalid@email');

  const err = screen.getByText(/error: email/i);
  expect(err).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const err = screen.getByText(/lastname is a required field/i);
  expect(err).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />);

  const firstInput = screen.getByLabelText(/first name\*/i);
  const lastInput = screen.getByLabelText(/last name\*/i);
  const emailInput = screen.getByLabelText(/email\*/i);

  userEvent.type(firstInput, 'Frodo');
  userEvent.type(lastInput, 'Baggins');
  userEvent.type(emailInput, 'theringismine@mntdoom.com');

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const firstDisp = screen.getByText(/first name:/i);
  const lastDisp = screen.getByText(/last name:/i);
  const emailDisp = screen.getByText(/email:/i);
  const messageDisp =  screen.queryByText(/message:/i);

  expect(firstDisp).toBeInTheDocument();
  expect(lastDisp).toBeInTheDocument();
  expect(emailDisp).toBeInTheDocument();
  expect(messageDisp).not.toBeInTheDocument();


});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />);

  const firstInput = screen.getByLabelText(/first name\*/i);
  const lastInput = screen.getByLabelText(/last name\*/i);
  const emailInput = screen.getByLabelText(/email\*/i);
  const messageInput = screen.getByLabelText(/message/i);

  userEvent.type(firstInput, 'Frodo');
  userEvent.type(lastInput, 'Baggins');
  userEvent.type(emailInput, 'theringismine@mntdoom.com');
  userEvent.type(messageInput, 'The Ring is mine!!');

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const firstDisp = screen.getByText(/first name:/i);
  const lastDisp = screen.getByText(/last name:/i);
  const emailDisp = screen.getByText(/email:/i);
  const messageDisp =  screen.getByText(/message:/i);

  expect(firstDisp).toBeInTheDocument();
  expect(lastDisp).toBeInTheDocument();
  expect(emailDisp).toBeInTheDocument();
  expect(messageDisp).toBeInTheDocument();
});

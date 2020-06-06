import React from 'react';
import LoginForm from '../LoginForm';
import { MemoryRouter } from "react-router-dom";
import { toHaveAttribute, toHaveTextContent} from "@testing-library/jest-dom/matchers"
import { render } from "@testing-library/react"

expect.extend({toHaveAttribute, toHaveTextContent})


test("LoginForm should render correct", () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const emailEl = getByLabelText(/email/i)
  expect(emailEl).toHaveAttribute("type", "email");
})

test("Debug", () => {
  const { debug } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  debug()
})
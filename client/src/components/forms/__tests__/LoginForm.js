import React from 'react';
import LoginForm from '../LoginForm';
import ReactDOM from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import { toHaveAttribute, toHaveTextContent} from "@testing-library/jest-dom/matchers"

import { getQueriesForElement } from "@testing-library/dom";

expect.extend({toHaveAttribute, toHaveTextContent})

function render(ui) {
  const container = document.createElement("div");
  ReactDOM.render(ui, container);
  const queries = getQueriesForElement(container);
  return { ...queries, container }
}

test("LoginForm should render correct", () => {
  const { getByLabelText } = render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const emailEl = getByLabelText(/email/i)
  expect(emailEl).toHaveAttribute("type", "email");
})
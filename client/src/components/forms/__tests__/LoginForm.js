import React from 'react';
import LoginForm from '../LoginForm';
import ReactDOM from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import { toHaveAttribute, toHaveTextContent} from "@testing-library/jest-dom/matchers"

import { queries } from "@testing-library/dom";

expect.extend({toHaveAttribute, toHaveTextContent})

test("LoginForm should render correct", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
    div
  );

  // expect(div.querySelector("#email").type).toBe("email")
  // expect(div.querySelector("#email")).toHaveAttribute("type", "email");
  // expect(div.querySelector("label")).toHaveTextContent("Email");

  const emailEl = queries.getByLabelText(div, /email/i)
  expect(emailEl).toHaveAttribute("type", "email");
})
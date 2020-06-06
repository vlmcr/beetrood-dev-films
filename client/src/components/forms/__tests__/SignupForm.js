import React from 'react';
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import SignupForm from "../SignupForm";
import {axe, toHaveNoViolations} from "jest-axe";

expect.extend(toHaveNoViolations);

test("Signup form must be accessibility",async () => {
  const { container } = render(
    <MemoryRouter>
      <SignupForm />
    </MemoryRouter>
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations()
});
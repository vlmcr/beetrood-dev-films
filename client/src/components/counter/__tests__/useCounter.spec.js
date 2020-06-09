import React from 'react';
import useCounter from "../useCounter";
import {act, render} from "@testing-library/react";

test("useCounter", () => {
  let result = {};

  function TestComponent() {
    result.current = useCounter()
    return null;
  }

  render(<TestComponent />);
  expect(result.current.count).toBe(0)
  act(() => { result.current.increment() })
  expect(result.current.count).toBe(1)
  act(() => { result.current.decrement() })
  expect(result.current.count).toBe(0)
})
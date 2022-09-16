// CODE

import { expect, it } from "vitest";
import { z } from "zod";

const Form = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).refine(
  (form) => form.password === form.confirmPassword,
  {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  },
);
//^ 🕵️‍♂️

export const validateFormInput = (values: unknown) => {
  return Form.parse(values);
};

// TESTS

it("Should error if the passwords are not the same", () => {
  expect(() =>
    validateFormInput({
      password: "password",
      confirmPassword: "password1",
    }),
  ).toThrowError("Passwords don't match");
});

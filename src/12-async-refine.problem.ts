// CODE

import { expect, it } from "vitest";
import { z } from "zod";

// HINT - use me!
const doesStarWarsPersonExist = async (id: string) => {
  const data = await fetch("https://swapi.dev/api/people/" + id).then((res) =>
    res.json(),
  );

  return Boolean(data?.name);
};

const Form = z.object({
  id: z.string().refine(
    async (id) => await doesStarWarsPersonExist(id),
    "Not found"
  )
});

export const validateFormInput = async (dto: z.infer<typeof Form>) => {
  return await Form.parseAsync(dto);
};

// TESTS

it("Should fail if the star wars person does not exist", async () => {
  await expect(
    validateFormInput({
      id: "123123123123123123",
    }),
  ).rejects.toThrow("Not found");
});

it("Should succeed if the star wars person does exist", async () => {
  expect(
    await validateFormInput({
      id: "1",
    }),
  ).toEqual({ id: "1" });
});

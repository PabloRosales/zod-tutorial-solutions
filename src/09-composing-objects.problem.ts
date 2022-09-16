import { z } from "zod";
import { Equal, Expect } from "./helpers/type-utils";

/**
 * 🕵️‍♂️ Refactor this code below to reduce the duplication,
 * while also making sure the cases don't go red!
 */

const BaseEntity = z.object({
  id: z.string().uuid(),
});

const User = BaseEntity.extend({
  name: z.string(),
});

const Post = BaseEntity.extend({
  title: z.string(),
  body: z.string(),
});

const Comment = BaseEntity.extend({
  text: z.string(),
});

type cases = [
  Expect<Equal<z.infer<typeof User>, { id: string; name: string }>>,
  Expect<Equal<z.infer<typeof Post>, { id: string; title: string; body: string }>>,
  Expect<Equal<z.infer<typeof Comment>, { id: string; text: string }>>,
];

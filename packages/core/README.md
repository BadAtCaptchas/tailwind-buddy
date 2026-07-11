# Tailwind Buddy

Framework-agnostic Tailwind CSS class composition with typed variants, slots,
compound variants, responsive values, and SSR-friendly output.

## Install

```bash
pnpm add @busbud/tailwind-buddy
```

## Example

```ts
import { compose } from "@busbud/tailwind-buddy";

const card = compose<{
  slots: ["root"];
  variants: { tone: ["light", "dark"] };
  props: {};
  screens: ["sm", "md"];
}>({
  slots: { root: "rounded p-4" },
  variants: {
    tone: {
      light: "bg-white text-gray-900",
      dark: "bg-gray-950 text-white",
    },
  },
  defaultVariants: { tone: "light" },
});

card.slots.root({ tone: "dark" });
```

Both the current `compose` API and the v2-compatible `setupCompose` API are
supported. See the [complete documentation](https://busbud.github.io/tailwind-buddy)
for responsive variants, safelist generation, Tailwind CSS 3/4 integration,
and migration guidance.

MIT

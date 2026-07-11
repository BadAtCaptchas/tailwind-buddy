# Tailwind Buddy

Tailwind Buddy is a framework-agnostic utility for composing Tailwind CSS
classes with typed variants, slots, compound variants, and responsive values.
Class generation is synchronous and SSR-friendly, and Tailwind CSS 3 and 4 are
both supported.

[Documentation](https://busbud.github.io/tailwind-buddy) ·
[npm](https://www.npmjs.com/package/@busbud/tailwind-buddy) ·
[Issues](https://github.com/busbud/tailwind-buddy/issues)

## Installation

```bash
pnpm add @busbud/tailwind-buddy
```

Tailwind CSS is an optional peer dependency. Install the version used by your
application if it is not already present.

## Quick start

```ts
import { compose, type VariantProps } from "@busbud/tailwind-buddy";

const screens = ["sm", "md", "lg", "xl", "2xl"] as const;

type ButtonDefinition = {
  slots: ["root", "label"];
  variants: {
    tone: ["primary", "secondary"];
    size: ["small", "large"];
  };
  props: { disabled?: boolean };
  screens: typeof screens;
};

export const button = compose<ButtonDefinition>({
  slots: {
    root: "inline-flex items-center rounded",
    label: "font-medium",
  },
  variants: {
    tone: {
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-100 text-gray-900",
    },
    size: {
      small: "h-8 px-3",
      large: "h-11 px-5",
    },
  },
  compoundVariants: [
    {
      conditions: { disabled: true },
      classes: "cursor-not-allowed opacity-50",
    },
  ],
  defaultVariants: { tone: "primary", size: "small" },
  responsiveVariants: ["size"],
});

export type ButtonProps = VariantProps<
  ButtonDefinition["variants"],
  ButtonDefinition["screens"]
> &
  ButtonDefinition["props"];

button.slots.root({
  tone: "secondary",
  size: { initial: "small", md: "large" },
});
```

## APIs

- `compose` is the current API and exposes generated functions under `.slots`.
- `setupCompose` preserves the v2 curried API and supports an injected class
  merger such as `tailwind-merge`.
- `generateSafeList` emits responsive classes for Tailwind CSS scanning. It
  accepts readonly inputs and never changes component definitions.
- `VariantProps` and `VariantsProps` infer component props for the two APIs.

See the guides for [responsive variants](https://busbud.github.io/tailwind-buddy/features/responsive-variants)
and [Tailwind CSS 4 safelist generation](https://busbud.github.io/tailwind-buddy/features/responsive-variants#specificity-for-tailwind-4).

## Development

```bash
nvm use
pnpm install --frozen-lockfile
pnpm verify
```

The workspace contains the published core package, React and Vue examples,
Tailwind CSS 3 and 4 integration projects, documentation, and benchmarks.

## Releasing

Prepare the version and changelog with `pnpm tailwindbuddy:release:prepare`,
review the generated commit/tag, then push a matching `vX.Y.Z` tag. The npm
workflow validates and publishes that tag using trusted publishing.

## License

MIT
